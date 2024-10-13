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

            $content = $this->getJsonData($imei);

            $generate_answer = $this->generate_answer_form_AI(json_encode($content));

            foreach ($generate_answer['messages'] as $message) {
                if ($message['role'] === 'assistant') {
                    return new JsonResponse($this->createDiscussion("Kết Quả Kiểm Tra Knox: $imei", $message['content']));
                }
            }

            return new JsonResponse($content);

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

    private function getJsonData(string $imei): array
    {
        try {

            $response = $this->client->post('https://samsungssl.com/extension/knox-checker', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'User-Data' => base64_encode($this->user),
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

    private function generate_answer_form_AI(string $jsonPlaintext): array
    {
        $client = new Client();

        try {
            $response = $client->post('https://api.coze.com/open_api/v1/web_chat', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer pat_VLPHEORpspWCr7ZbFYR0lujbDdk3noWlH4CJ1bwG8IgWYxrjFn7UPzAvOJDdIVZl',
                ],
                'json' => [
                    'bot_id' => '7404763499181883408',
                    'content_type' => 'text',
                    'query' => $jsonPlaintext,
                    'user' => '7746869458114df8a6fff02f4f6c7361',
                    'scene' => 1000,
                    'draft_mode' => false,
                    'stream' => false,
                ],
            ]);

            preg_match('/data:(\{.*\})/', $response->getBody()->getContents(), $matches);

            if (!isset($matches[1])) {
                throw new \Exception('Invalid response format');
            }

            return json_decode($matches[1], true);

        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $statusCode = $e->getResponse()->getStatusCode();
                $errorBody = $e->getResponse()->getBody()->getContents();
                throw new \Exception("API error (status $statusCode): $errorBody");
            }
            throw new \Exception(app('translator')->trans('lewuocvi-knoxextchecker.api.error_server_connection'));
        }
    }

    private function createDiscussion(string $title, string $content): array
    {
        if (empty($title) || empty($content)) {
            throw new \InvalidArgumentException('Invalid input parameters');
        }

        $client = new Client();
        $apiToken = 'ornmpDRLsUD7fPfyOkcouGCB4P7fpiIS3JWJqDNk';

        if (!$apiToken) {
            throw new \RuntimeException('API token not configured');
        }

        try {
            $response = $client->post('https://sitedemo.knoxsamsung.com/api/discussions', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Token ' . $apiToken,
                ],
                'json' => [
                    'data' => [
                        'type' => 'discussions',
                        'attributes' => [
                            'title' => $title,
                            'content' => $content,
                        ],
                        'relationships' => [
                            'recipientUsers' => [
                                'data' => [
                                    ['type' => 'users', 'id' => '1'],
                                    ['type' => 'users', 'id' => $this->user->id],
                                ],
                            ],
                        ],
                    ],
                ],
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $statusCode = $e->getResponse()->getStatusCode();
                $errorBody = $e->getResponse()->getBody()->getContents();
                throw new \Exception("API error (status $statusCode): $errorBody");
            }
            throw new \Exception(app('translator')->trans('lewuocvi-knoxextchecker.api.error_server_connection'));
        }
    }
}
