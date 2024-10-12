<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use Flarum\User\Guest;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class UserController implements RequestHandlerInterface
{
    public function handle(ServerRequestInterface $request): JsonResponse
    {
        $actor = $request->getAttribute('actor');

        if ($actor instanceof Guest) {
            return $this->errorResponse('lewuocvi-knoxextchecker.api.error_guest');
        }

        try {

            $data = $this->getJsonData($actor->email, $actor->id);

            return new JsonResponse($data);
        } catch (\Exception $e) {
            return $this->errorResponse('lewuocvi-knoxextchecker.api.error_server_connection');
        }
    }

    private function getJsonData(string $email, int $userId): array
    {
        $client = new Client();

        try {
            $identifier = base64_encode($email . ':' . $userId);
            $response = $client->post('https://samsungssl.com/extension/user', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'flarum-connector-identifier' => $identifier,
                ],
                'json' => [
                    'email' => $email,
                    'user_id' => $userId,
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
