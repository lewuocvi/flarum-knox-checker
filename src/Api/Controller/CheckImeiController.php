<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use Flarum\User\User;
use GuzzleHttp\Client;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class CheckImeiController implements RequestHandlerInterface
{
    private $client;
    private $user;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }
    public function handle(ServerRequestInterface $request): JsonResponse
    {
        try {
            $this->user = $request->getAttribute('actor');

            if (!$this->user instanceof User) {
                return $this->errorResponse('unauthorized', 'User not authenticated', 401);
            }

            $parsedBody = $request->getParsedBody();
            $imei = $parsedBody['imei'] ?? null;

            if (!$this->isValidImei($imei)) {
                return $this->errorResponse('lewuocvi-knoxextchecker.api.error_invalid_imei');
            }

            return new JsonResponse($this->getJsonData($imei));

        } catch (\Exception $e) {
            return new JsonResponse(['status' => 'error', 'message' => $e->getMessage()]);
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

    private function isValidImei(?string $imei): bool
    {
        return $imei !== null && strlen($imei) === 15 && ctype_digit($imei);
    }

    private function getBaseUrl(): string
    {
        return resolve('Flarum\Http\UrlGenerator')->to('forum')->base();
    }

    private function getJsonData(string $imei): array
    {
        try {

            $response = $this->client->post('https://samsungssl.com/extension/knox-checker', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'User-Data' => base64_encode($this->user),
                    'Request-From-Url' => $this->getBaseUrl(),
                ],
                'json' => [
                    'imei' => $imei,
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            throw new \Exception(app('translator')->trans('lewuocvi-knoxextchecker.api.error_server_connection'));
        }
    }
}
