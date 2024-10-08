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
use Samsungssl\KnoxChecker\Api\Controllers\CheckImeiController;

return [

    new Extend\Locales(__DIR__ . '/locale'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js')->css(__DIR__ . '/less/admin.less'),

    (new Extend\Frontend('forum'))->route('/knox-checker', 'knox_checker'),
    // (new Extend\Frontend('forum'))->route('/deposit-money', 'deposit_money'),
    // (new Extend\Frontend('forum'))->route('/check-balance', 'check_balance'),
    // (new Extend\Frontend('forum'))->route('/checker-history', 'checker_history'),
    (new Extend\Routes('api'))->post('/knox-checker', 'api_knox_checker', CheckImeiController::class),
];
