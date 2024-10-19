<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use GuzzleHttp\Client;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class BackEndProxy implements RequestHandlerInterface
{
    private $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function handle(ServerRequestInterface $request): JsonResponse
    {
        try {
            $user = $request->getAttribute('actor');
            $queryParams = $request->getQueryParams();

            if (!empty($queryParams['url'])) {

                $options = [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Accept-Language' => $request->getHeaderLine('accept-language'),
                        'Request-From-Url' => $request->getHeaderLine('host'),
                        'cookie' => $request->getHeaderLine('cookie'),
                        'User-Data' => base64_encode(json_encode($user)),
                    ],
                ];

                if (strtoupper($request->getMethod()) === 'POST') {
                    $options['json'] = $request->getParsedBody();
                    $response = $this->client->post($queryParams['url'], $options);
                } else {
                    $response = $this->client->get($queryParams['url'], $options);
                }

                return new JsonResponse(json_decode($response->getBody()->getContents(), true));
            }

            return new JsonResponse(['status' => 'error', 'message' => 'Missing or invalid URL in the request.'], 400);

        } catch (\Exception $e) {
            return new JsonResponse(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
