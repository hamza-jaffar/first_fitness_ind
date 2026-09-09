<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Slider::create([
            'badge_text' => 'Welcome to first fitness',
            'title' => 'Fitness Equipment.',
            'desc' => 'Custom made boxing gloves equipment wholesale manufacturer supplier',
            'button_text' => 'Explore Product',
            'button_url' => '#',
            'image' => '/banners/PoDKswyqkum60JkNO6o2CE3GfskyrhxBayvkI2d0.png',
        ]);

        Slider::create([
            'badge_text' => 'Welcome to first fitness',
            'title' => 'Boxing Gloves and Equipment.',
            'desc' => 'Custom made boxing gloves equipment wholesale manufacturer supplier',
            'button_text' => 'Explore Product',
            'button_url' => '#',
            'image' => '/banners/uJjUl1r1bnrISUULwphPH5CfQiSgz7hDlCUhYJ2X.png',
        ]);
    }
}
