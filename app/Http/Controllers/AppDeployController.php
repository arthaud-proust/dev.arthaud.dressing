<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use function abort;
use function base_path;
use function response;
use function shell_exec;

class AppDeployController
{
    private const RATE_LIMITER_KEY = 'deploy-app';
    private const RATE_LIMITER_PER_MINUTE = 2;

    public function __invoke(Request $request)
    {
        if (RateLimiter::tooManyAttempts(self::RATE_LIMITER_KEY, self::RATE_LIMITER_PER_MINUTE)) {
            abort(429);
        }
        RateLimiter::increment(self::RATE_LIMITER_KEY);

        if ($request->bearerToken() !== config('app.deploy-token')) {
            abort(403);
        }

        $basePath = base_path();

        $output = shell_exec("cd $basePath && make deploy");

        Log::info($output);

        return response()->json('deployed');
    }
}
