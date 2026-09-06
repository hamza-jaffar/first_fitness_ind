<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_users_can_create_filter_view_and_delete_products(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Training', 'slug' => 'training']);

        $this->actingAs($user);

        $response = $this->post(route('dashboard.products.store'), [
            'category_id' => $category->id,
            'title' => 'Performance Tee',
            'art_no' => 'TEE-001',
            'sku' => 'TEE-001-BLK',
            'short_desc' => 'A lightweight training tee.',
            'sizes' => ['S', 'M', 'L'],
            'colors' => ['Black'],
            'thumbnail_file' => UploadedFile::fake()->create('thumbnail.jpg', 100, 'image/jpeg'),
            'image_files' => [UploadedFile::fake()->create('front.jpg', 100, 'image/jpeg'), UploadedFile::fake()->create('back.jpg', 100, 'image/jpeg')],
            'is_active' => true,
            'is_featured' => false,
        ]);

        $product = Product::firstOrFail();
        $response->assertRedirect(route('dashboard.products.index'));
        $this->assertSame('performance-tee', $product->slug);
        $this->assertSame(['S', 'M', 'L'], $product->sizes);
        $this->assertStringContainsString('storage/products/', $product->thumbnail);
        $this->assertCount(2, $product->images);

        $this->get(route('dashboard.products.index', ['search' => 'TEE-001']))->assertOk();
        $this->get(route('dashboard.products.show', $product))->assertOk();

        $this->delete(route('dashboard.products.destroy', $product))
            ->assertRedirect(route('dashboard.products.index'));
        $this->assertSoftDeleted('products', ['id' => $product->id]);
    }
}