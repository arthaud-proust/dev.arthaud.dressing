<?php

namespace Tests\Feature\ClothesCategory;

use App\Models\ClothesCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClothesCategoryReorderTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_reorder_categories(): void
    {
        $user = User::factory()->create();
        $categoryA = ClothesCategory::factory()->for($user)->create();
        $categoryB = ClothesCategory::factory()->for($user)->create();
        $categoryC = ClothesCategory::factory()->for($user)->create();

        $this->assertSame(0, $categoryC->order);
        $this->assertSame(0, $categoryB->order);
        $this->assertSame(0, $categoryA->order);

        $response = $this
            ->actingAs($user)
            ->post("/clothes-categories/reorder", [
                'ids' => [
                    $categoryC->id,
                    $categoryB->id,
                    $categoryA->id,
                ],
            ]);

        $response->assertSessionDoesntHaveErrors();
        $response->assertRedirect("/clothes-categories");

        $categoryA->refresh();
        $categoryB->refresh();
        $categoryC->refresh();

        $this->assertSame(0, $categoryC->order);
        $this->assertSame(1, $categoryB->order);
        $this->assertSame(2, $categoryA->order);
    }
}
