<?php

namespace App\Console\Commands\DataMigration;

use App\Models\User;
use Illuminate\Console\Command;

class CreateDefaultClothesCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-default-clothes-categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create default clothes category for clothes that have not category';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        User::each(static function (User $user) {
            $uncategorizedCount = $user->clothes()->whereNull('clothes_category_id')->count();

            if ($uncategorizedCount > 0) {
                $user->clothes()->whereNull('clothes_category_id')->update([
                    'clothes_category_id' => $user->uncategorizedClothesCategory()->id,
                ]);
            }
        });
    }
}
