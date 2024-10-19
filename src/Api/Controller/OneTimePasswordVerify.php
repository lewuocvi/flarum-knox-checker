<?php

namespace Samsungssl\KnoxChecker\Api\Controller;

use Flarum\Http\SessionAccessToken;
use Flarum\Http\SessionAuthenticator;
use Flarum\Http\UrlGenerator;
use Flarum\User\Event\LoggedIn;
use Flarum\User\User;
use Flarum\User\UserRepository;
use GuzzleHttp\Client;
use Illuminate\Contracts\Events\Dispatcher;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class OneTimePasswordVerify implements RequestHandlerInterface
{
    private $users;
    private $client;
    private $authenticator;
    private $events;

    public function __construct(UserRepository $users, Client $client, SessionAuthenticator $authenticator, Dispatcher $events)
    {
        $this->users = $users;
        $this->client = $client;
        $this->authenticator = $authenticator;
        $this->events = $events;
    }

    public function handle(ServerRequestInterface $request): JsonResponse
    {
        try {
            $queryParams = $request->getQueryParams();
            $queryString = http_build_query($queryParams);

            if (empty($queryParams['otp_code'])) {
                return new JsonResponse(['status' => 'error', 'message' => 'Missing or invalid otp_code in the request.']);
            }

            $options = [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Accept-Language' => $request->getHeaderLine('accept-language'),
                    'Request-From-Url' => $request->getHeaderLine('host'),
                    'cookie' => $request->getHeaderLine('cookie'),
                    'User-Data' => base64_encode(json_encode($request->getAttribute('actor'))),
                ],
            ];

            $response = $this->client->get('https://samsungssl.com/extension/OneTimePasswordController?' . $queryString, $options);
            $jsonData = json_decode($response->getBody()->getContents(), true);

            if ($jsonData['status'] !== 'success' || empty($jsonData['data'])) {
                return new JsonResponse($jsonData);
            }

            $user = User::where('email', $jsonData['data']['email'])->first();
            if (!$user) {
                return new JsonResponse(['status' => 'error', 'message' => 'User not found.']);
            }

            $session = $request->getAttribute('session');
            $sessionAccessToken = SessionAccessToken::generate($user->id);

            $this->authenticator->logIn($session, $sessionAccessToken);
            $this->events->dispatch(new LoggedIn($this->users->findOrFail($user->id), $sessionAccessToken));

            $urlGenerator = resolve(UrlGenerator::class);
            $forumUrl = $urlGenerator->to('forum')->route('knox_checker');

            return new JsonResponse(['status' => 'success', 'forumUrl' => $forumUrl, 'user' => $user, 'message' => 'User logged in successfully.']);

        } catch (\Exception $e) {
            return new JsonResponse(['status' => 'error', 'message' => $e->getMessage()]);
        }
    }
}
