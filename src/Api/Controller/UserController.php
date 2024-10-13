<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use Flarum\User\User;
use GuzzleHttp\Client;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class UserController implements RequestHandlerInterface
{
    private $client;
    private $user;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }
    public function handle(ServerRequestInterface $request): JsonResponse
    {
        $this->user = $request->getAttribute('actor');

        if (!$this->user instanceof User) {
            return $this->errorResponse('unauthorized', 'User not authenticated', 401);
        }

        try {
            return new JsonResponse($this->getJsonData());
        } catch (\Exception $e) {
            return $this->errorResponse('lewuocvi-knoxextchecker.api.error_server_connection', $e->getMessage(), 500);
        }
    }

    private function getJsonData(): array
    {
        try {
            $response = $this->client->post('https://samsungssl.com/extension/user', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'User-Data' => base64_encode($this->user),
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            return $this->errorResponse('lewuocvi-knoxextchecker.api.error_server_connection', $e->getMessage(), 500);
        }
    }

    private function errorResponse(string $errorCode, string $message, int $status = 400): JsonResponse
    {
        return new JsonResponse([
            'errors' => [
                [
                    'status' => (string) $status,
                    'code' => $errorCode,
                    'title' => app('translator')->trans($errorCode),
                    'detail' => $message,
                ],
            ],
        ], $status);
    }
}
