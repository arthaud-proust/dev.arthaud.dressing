<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;
use Illuminate\Support\Str;
use function file_get_contents;
use function file_put_contents;
use function preg_quote;
use function preg_replace;

class GenerateDeployToken extends Command
{
    use ConfirmableTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:deploy-token:generate
                    {--show : Display the token instead of modifying files}
                    {--force : Force the operation to run when in production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set the deploy application token';

    protected string $configVariableKey = 'app.deploy-token';
    protected string $envVariableKey = 'APP_DEPLOY_TOKEN';

    public function handle(): void
    {
        $token = $this->generateRandomToken();

        if ($this->option('show')) {
            $this->line('<comment>' . $token . '</comment>');

            return;
        }

        if (!$this->setTokenInEnvironmentFile($token)) {
            return;
        }

        $this->laravel['config'][$this->configVariableKey] = $token;

        $this->components->info("$this->envVariableKey set successfully.");
    }

    protected function generateRandomToken(): string
    {
        return Str::toBase64(Str::random(128));
    }

    protected function setTokenInEnvironmentFile(string $key): bool
    {
        $currentToken = $this->laravel['config'][$this->configVariableKey];

        if ($currentToken !== '' && (!$this->confirmToProceed())) {
            return false;
        }

        if (!$this->writeNewEnvironmentFileWith($key)) {
            return false;
        }

        return true;
    }

    protected function writeNewEnvironmentFileWith(string $token): bool
    {
        $replaced = preg_replace(
            $this->tokenReplacementPattern(),
            "$this->envVariableKey=$token",
            $input = file_get_contents($this->laravel->environmentFilePath())
        );

        if ($replaced === $input || $replaced === null) {
            $this->error("Unable to set $this->envVariableKey. No $this->envVariableKey variable was found in the .env file.");

            return false;
        }

        file_put_contents($this->laravel->environmentFilePath(), $replaced);

        return true;
    }

    protected function tokenReplacementPattern(): string
    {
        $escaped = preg_quote('=' . $this->laravel['config'][$this->configVariableKey], '/');

        return "/^$this->envVariableKey{$escaped}/m";
    }
}
