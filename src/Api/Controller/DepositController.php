<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use Flarum\User\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Log\LoggerInterface;

class DepositController implements RequestHandlerInterface
{
    private Client $client;
    private ?User $user = null;
    private LoggerInterface $logger;

    public function __construct(Client $client, LoggerInterface $logger)
    {
        $this->client = $client;
        $this->logger = $logger;
    }

    public function handle(ServerRequestInterface $request): JsonResponse
    {
        try {
            $this->user = $request->getAttribute('actor');
            if (!$this->user instanceof User) {
                return $this->errorResponse('unauthorized', 'User not authenticated', 401);
            }

            $data = $request->getParsedBody();
            $action = $data['action'] ?? 'generate';
            $deposit_amount = $data['deposit_amount'] ?? 20000;

            if (!in_array($action, ['history', 'generate'])) {
                return $this->errorResponse('invalid_action', 'Invalid action specified', 400);
            }

            $response = $this->performAction($action, $deposit_amount);

            $responseData = json_decode($response->getBody()->getContents(), true);

            return new JsonResponse($responseData);

        } catch (GuzzleException $e) {
            $this->logger->error('API error: ' . $e->getMessage());
            return $this->errorResponse('api_error', $e->getMessage(), 500);
        } catch (\Exception $e) {
            $this->logger->error('Server error: ' . $e->getMessage());
            return $this->errorResponse('server_error', $e->getMessage(), 500);
        }
    }

    private function performAction(string $action, int $deposit_amount)
    {
        $url = 'https://samsungssl.com/extension/deposit';
        $headers = [
            'Content-Type' => 'application/json',
            'Accept-Language' => $this->getLocale(),
            'User-Data' => $this->encodeUserData($this->user),
        ];

        if ($action === 'history') {
            return $this->client->get($url, ['headers' => $headers]);
        }

        return $this->client->post($url, [
            'headers' => $headers,
            'json' => ['deposit_amount' => $deposit_amount],
        ]);
    }

    private function getLocale(): string
    {
        return app('translator')->getLocale();
    }

    private function encodeUserData(User $user): string
    {
        // Implement a secure way to encode user data
        return base64_encode($user); // Example: encoding user
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
