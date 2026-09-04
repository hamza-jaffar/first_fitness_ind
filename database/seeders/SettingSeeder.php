<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'key' => 'logo',
                'content' => '/uploads/images/logo.png',
            ],
            [
                'key' => 'favicon',
                'content' => '/uploads/images/favicon.png',
            ],
            [
                'key' => 'description',
                'content' => 'We are one of the best Manufacturers and Exporters in the field of Boxing Equipment, Martial Arts, MMA Gear and Fitness Equipment in Sialkot-Pakistan',
            ],
            [
                'key' => 'location',
                'content' => '8th Km, Pasrur Road, Sialkot- 51310, Pakistan',
            ],
            [
                'key' => 'email',
                'content' => 'contact@degvora.com',
            ],
            [
                'key' => 'phone',
                'content' => '+923466624947',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
