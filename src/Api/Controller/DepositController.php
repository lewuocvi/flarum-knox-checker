<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use Flarum\User\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class DepositController implements RequestHandlerInterface
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
            if (!$user instanceof User) {
                return $this->errorResponse('unauthorized', 'User not authenticated', 401);
            }

            $email = $user->email;
            $userId = $user->id;

            $identifier = base64_encode($email . ':' . $userId);

            $data = $request->getParsedBody();
            $action = $data['action'] ?? 'generate'; // Default to 'generate' if not specified
            $deposit_amount = $data['deposit_amount'] ?? 20000; // Default to 20000 if not specified

            if (!in_array($action, ['history', 'generate'])) {
                return $this->errorResponse('invalid_action', 'Invalid action specified', 400);
            }

            if ($action == 'history') {
                $response = $this->client->get('https://samsungssl.com/extension/deposit', [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'flarum-connector-identifier' => $identifier,
                    ],
                ]);
            }

            if ($action == 'generate') {
                $response = $this->client->post('https://samsungssl.com/extension/deposit', [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'flarum-connector-identifier' => $identifier,
                    ],
                    'json' => [
                        'deposit_amount' => $deposit_amount,
                    ],
                ]);
            }

            $responseData = json_decode($response->getBody()->getContents(), true);
            
            return new JsonResponse($responseData);

        } catch (GuzzleException $e) {
            return $this->errorResponse('api_error', $e->getMessage(), 500);
        } catch (\Exception $e) {
            return $this->errorResponse('server_error', $e->getMessage(), 500);
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
