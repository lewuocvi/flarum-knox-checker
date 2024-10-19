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
use Samsungssl\KnoxChecker\Api\Controller\BackEndProxy;
use Samsungssl\KnoxChecker\Api\Controller\OneTimePasswordVerify;

return [

    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js')->css(__DIR__ . '/less/admin.less'),

    (new Extend\Frontend('forum'))
        ->route('/knox-checker', 'knox_checker')
        ->route('/knox-checker/deposit', 'knox_checker:deposit')
        ->route('/knox-checker/user', 'knox_checker:user'),

    (new Extend\Routes('api'))
        ->GET('/extension/OneTimePasswordVerify', 'OneTimePasswordVerify:POST', OneTimePasswordVerify::class)
        ->GET('/extension/proxy', 'API/BackEndProxy/GET', BackEndProxy::class)
        ->post('/extension/proxy', 'API/BackEndProxy/POST', BackEndProxy::class),
];
