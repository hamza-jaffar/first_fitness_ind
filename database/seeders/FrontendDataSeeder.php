<?php

namespace Database\Seeders;

use App\Models\FrontendData;
use Illuminate\Database\Seeder;

class FrontendDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FrontendData::updateOrCreate(
            ['key' => 'who-we-are'],
            [
                'content' => [
                    'badge_text' => 'Who We Are',
                    'title' => 'Wholesale Boxing Gloves Manufacturers & Supplier',
                    'description' => 'Most manufacturing relationships fail not because of a lack of machinery, but because of a breakdown in translation. You send a detailed design file; what arrives months later feels like a compromise.
                                    At First Fitness Industries, we have spent over 15 years rewriting that narrative from Sialkot, Pakistan. We do not view ourselves as an outsourced factory for hire. We operate as the direct physical extension of your product design team. From the density profiling of our combat foam matrix to the precise stretch-recovery metrics of our compression textiles, we build what your brand stands for.',

                    'main_image' => '/frontend/about_1-1.jpg',
                    'overflow_image' => '/frontend/about_1-2.jpg',

                    'button' => [
                        'text' => 'Learn More',
                        'url' => '/about-us',
                    ],

                    'tabs' => [
                        [
                            'title' => 'Our Mission',
                            'description' => 'To give premium brand owners, product developers, and distributors a single, friction-less production line for both technical combat gear and performance apparel. We turn complex design specifications into flawless physical products through precise craftsmanship, rigorous multi-stage quality control, and strict compliance with international labor standards.',
                        ],
                        [
                            'title' => 'Our Vision',
                            'description' => 'To be the absolute standard for reliable cross-category sports manufacturing. We see a future where scaling fitness and combat brands can launch, grow, and expand without ever worrying about product failures, broken communication, or fractured supply chains. We want to prove that global production can be entirely transparent, ethical, and collaborative.',
                        ],
                        [
                            'title' => 'Our Goal',
                            'description' => 'To help growing independent sports and fitness brands scale their operations by completely eliminating multi-vendor headaches. We aim to achieve this by consistently delivering retail-ready products that match your blueprints exactly, maintaining 100% on-time shipping schedules, and acting as the dependable backbone of your global supply chain.',
                        ],
                    ],
                ],
            ]
        );

        FrontendData::updateOrCreate(
            ['key' => 'our-feature'],
            [
                'content' => [
                    'badge_text' => 'Our Features',
                    'title' => 'Our Work Flow',
                    'cards' => [
                        [
                            'title' => 'Mockup',
                            'description' => 'Our skilled designers produce a mockup prototype for samples of your brand to have a more realistic appearance.',
                            'image' => '/frontend/icon1.png',
                        ],
                        [
                            'title' => 'Alteration and approval',
                            'description' => 'Our top priority is your satisfaction and approval. Initiate the sample manufacturing if any adjustments are needed.',
                            'image' => '/frontend/icon2.png',
                        ],
                        [
                            'title' => 'Designing',
                            'description' => 'Our experienced Team provides OEM/ODM Customization services to bring your ideas to reality.',
                            'image' => '/frontend/icon3.png',
                        ],
                        [
                            'title' => 'Mass Production',
                            'description' => 'We start mass manufacturing within the given timeline once your prototype or samples have been approved and the materials have been chosen.',
                            'image' => '/frontend/icon4.png',
                        ],
                    ],
                ],
            ]
        );

        FrontendData::updateOrCreate(
            ['key' => 'why-choose-us'],
            [
                'content' => [
                    'badge_text' => 'Why Choose Us?',
                    'title' => 'Why Choose Us?',
                    'description' => 'We offer low minimum order quantity and the best lead time. We have strict quality control checks to ensure customer satisfaction.',
                    'image' => '/frontend/wcu_1-2.jpg',
                    'cards' => [
                        [
                            'title' => 'Quality Focus',
                            'description' => 'We aim to provide the best quality as per our customer expectations.',
                        ],
                        [
                            'title' => 'Best Prices',
                            'description' => 'We offer premium products at the lowest price as per our customer expectations.',
                        ],
                        [
                            'title' => 'Worldwide Shipping',
                            'description' => 'We offer worldwide shipping using top services like DHL / Fedex.',
                        ],
                        [
                            'title' => 'Free Expert Help',
                            'description' => 'Need a quick hand to start? Get Free Consultation with our experts via WhatsApp.',
                        ],
                    ],
                ],
            ]
        );

        FrontendData::updateOrCreate(
            ['key' => 'our-category'],
            [
                'content' => [
                    'badge_text' => 'We Build premium quality as per our customer expectations.',
                    'title' => 'OUR CATEGORIES',
                ],
            ]
        );

        FrontendData::updateOrCreate(
            ['key' => 'featured-products'],
            [
                'content' => [
                    'badge_text' => 'We aim to provide the best quality as per our customer expectations.',
                    'title' => 'Featured Products',
                ],
            ]
        );
    }
}
