<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use Flarum\Settings\SettingsRepositoryInterface;
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
                        'user-agent' => $request->getHeaderLine('user-agent'),
                        'Content-Type' => 'application/json',
                        'Accept-Language' => $this->getUserLanguage($request),
                        'forum-url' => $request->getHeaderLine('origin'),
                        'Forum-Cookie' => $request->getHeaderLine('cookie'),
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

    public function getUserLanguage($request): string
    {
        // Lấy thông tin Actor (người dùng hiện tại hoặc khách)
        $actor = $request->getAttribute('actor');

        // Lấy cài đặt của hệ thống
        $settings = app(SettingsRepositoryInterface::class);

        // Lấy ngôn ngữ mặc định từ cài đặt hệ thống
        $defaultLanguage = $settings->get('default_locale');

        // Nếu người dùng không phải là khách, kiểm tra xem họ có ngôn ngữ riêng không
        if (!$actor instanceof Guest) {
            $userLanguage = $actor->getPreference('locale');

            // Nếu người dùng có chọn ngôn ngữ, trả về ngôn ngữ đó
            if ($userLanguage) {
                return $userLanguage;
            }
        }

        // Trả về ngôn ngữ mặc định nếu người dùng là khách hoặc chưa chọn ngôn ngữ
        return $defaultLanguage;
    }
}
