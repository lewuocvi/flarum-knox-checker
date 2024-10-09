<?php

/*
 * This file is part of lewuocvi/knox-policy-checker.
 *
 * Copyright (c) 2024 lewuocvi.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Samsungssl\KnoxChecker;

use Flarum\Extend;

return [

    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js')->css(__DIR__ . '/less/admin.less'),

    (new Extend\Frontend('forum'))
        ->route('/knox-checker', 'knox_checker')
        ->route('/knox-checker/deposit', 'knox_checker:deposit')
        ->route('/knox-checker/user', 'knox_checker:user'),

    (new Extend\Routes('api'))
        ->post('/knox-checker', 'api_knox_checker', \Samsungssl\KnoxChecker\Api\Controller\CheckImeiController::class)
        ->post('/knox-checker/user', 'api_knox_checker:user', \Samsungssl\KnoxChecker\Api\Controller\UserController::class)
        ->post('/knox-checker/deposit', 'api_knox_checker:deposit_post', \Samsungssl\KnoxChecker\Api\Controller\DepositController::class),
];