<?php

namespace Samsungssl\KnoxChecker\Api\Controllers;

use Flarum\User\Guest;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class CheckImeiController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): JsonResponse
    {
        try {
            $actor = $request->getAttribute('actor');

            if ($actor instanceof Guest) {
                return $this->errorResponse('lewuocvi-knoxextchecker.api.error_guest');
            }

            $parsedBody = $request->getParsedBody();
            $imei = $parsedBody['imei'] ?? null;

            if (!$this->isValidImei($imei)) {
                return $this->errorResponse('lewuocvi-knoxextchecker.api.error_invalid_imei');
            }

            $data = $this->getJsonData($imei, $actor->email, $actor->id);

            return new JsonResponse($data);

        } catch (\Exception $e) {
            return new JsonResponse(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }

    private function isValidImei(?string $imei): bool
    {
        return $imei !== null && strlen($imei) === 15 && ctype_digit($imei);
    }

    private function getJsonData(string $imei, string $email, int $userId): array
    {
        $client = new Client();

        try {
            $identifier = base64_encode($email . ':' . $userId);
            $response = $client->post('https://samsungssl.com/flarum/knox-checker', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'flarum-connector-identifier' => $identifier
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

    private function errorResponse(string $messageKey): JsonResponse
    {
        $message = app('translator')->trans($messageKey);
        return new JsonResponse(['status' => 'error', 'message' => $message]);
    }
}