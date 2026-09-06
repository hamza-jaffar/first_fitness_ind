<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable('category_id',
    'title', 'slug', 'art_no', 'sku', 'short_desc', 'desc', 'material', 'gender', 'fit', 'sizes', 'colors', 'thumbnail', 'images', 'meta_title', 'meta_description', 'meta_keywords', 'is_active', 'is_featured')]
class Product extends Model
{
    use SoftDeletes;

    protected function casts(): array
    {
        return [
            'sizes' => 'array',
            'colors' => 'array',
            'images' => 'array',
            'meta_keywords' => 'array',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    /** @return BelongsTo<Category, $this> */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
