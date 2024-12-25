<?php

namespace Tests\Unit\Models;

use App\Models\ClothesCategory;
use App\Models\ClothesCategoryRequirement;
use App\Models\Clothing;
use App\Models\Dressing;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClothesCategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_category_requirement_for_each_dressing(): void
    {
        $user = User::factory()->create();
        $dressingA = Dressing::factory()->for($user)->create();
        $dressingB = Dressing::factory()->for($user)->create();

        $this->assertDatabaseCount(ClothesCategoryRequirement::class, 0);
        $clothesCategory = ClothesCategory::factory()->for($user)->create();
        $this->assertDatabaseCount(ClothesCategoryRequirement::class, 2);
    }

    public function test_delete_category_requirement_for_each_dressing(): void
    {
        $user = User::factory()->create();
        $dressingA = Dressing::factory()->for($user)->create();
        $dressingB = Dressing::factory()->for($user)->create();

        $clothesCategory = ClothesCategory::factory()->for($user)->create();
        $this->assertDatabaseHas(ClothesCategoryRequirement::class, [
            'clothes_category_id' => $clothesCategory->id,
            'dressing_id' => $dressingA->id,
        ]);
        $this->assertDatabaseHas(ClothesCategoryRequirement::class, [
            'clothes_category_id' => $clothesCategory->id,
            'dressing_id' => $dressingB->id,
        ]);

        $clothesCategory->delete();

        $this->assertDatabaseMissing(ClothesCategoryRequirement::class, [
            'clothes_category_id' => $clothesCategory->id,
            'dressing_id' => $dressingA->id,
        ]);
        $this->assertDatabaseMissing(ClothesCategoryRequirement::class, [
            'clothes_category_id' => $clothesCategory->id,
            'dressing_id' => $dressingB->id,
        ]);
    }

    public function test_delete_will_link_its_clothes_to_uncategorized_category(): void
    {
        $user = User::factory()->create();
        $dressing = Dressing::factory()->for($user)->create();
        $clothesCategory = ClothesCategory::factory()->for($user)->create();
        $clothing = Clothing::factory()->for($dressing)->for($clothesCategory)->create();

        $clothesCategory->delete();

        $clothing->refresh();
        $uncategorizedCategory = ClothesCategory::first();
        $this->assertNotNull($uncategorizedCategory);
        $this->assertNotSame($clothesCategory->id, $uncategorizedCategory->id);
        $this->assertSame($uncategorizedCategory->id, $clothing->clothes_category_id);
    }
}
