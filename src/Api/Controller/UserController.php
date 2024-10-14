<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use Flarum\User\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class UserController implements RequestHandlerInterface
{
    private Client $client;
    private ?User $user = null;
    private $translator;

    public function __construct(Client $client)
    {
        $this->client = $client;
        $this->translator = app('translator');
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

    private function getLocale(): string
    {
        return $this->translator->getLocale();
    }

    private function encodeUserData(User $user): string
    {
        // Implement a secure way to encode user data
        return base64_encode($user); // Example: encoding user
    }

    private function getJsonData(): array
    {
        try {
            $response = $this->client->post('https://samsungssl.com/extension/user', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept-Language' => $this->getLocale(),
                    'User-Data' => $this->encodeUserData($this->user),
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
                    'title' => $this->translator->trans($errorCode),
                    'detail' => $message,
                ],
            ],
        ], $status);
    }
}
