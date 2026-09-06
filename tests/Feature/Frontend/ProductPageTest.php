<?php

namespace Tests\Feature\Frontend;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_nested_category_url_can_be_opened_from_product_detail_navigation(): void
    {
        $parent = Category::create(['name' => 'Fitness Wears', 'slug' => 'fitness-wears']);
        $category = Category::create([
            'name' => 'Gym Gloves',
            'slug' => 'gym-gloves',
            'parent_category_id' => $parent->id,
        ]);

        Product::create([
            'category_id' => $category->id,
            'title' => 'Training Gloves',
            'slug' => 'training-gloves',
            'art_no' => 'GL-001',
            'is_active' => true,
            'is_featured' => false,
        ]);

        $this->get(route('products.subcategory', [$parent->slug, $category->slug]))
            ->assertOk();

        $this->get(route('product.show', 'training-gloves'))
            ->assertOk();
    }
}