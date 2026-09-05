<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'name' => 'About Us',
                'slug' => 'about-us',
                'content' => <<<'HTML'
<article>
    <!-- Headings -->
    <h1>Who We Are</h1>

    <h2>Our Experience</h2>

    <h3>More Than 33 Years of Experience</h3>

    <h4>Manufacturing Excellence</h4>

    <h5>Quality & Innovation</h5>

    <h6>Our Commitment</h6>

    <!-- Paragraph -->
    <p>
        Pak World Equestrian is a leading manufacturer and exporter of
        <strong>high-quality equestrian products</strong>. With more than
        three decades of experience, we combine skilled craftsmanship,
        modern manufacturing techniques, and continuous innovation.
    </p>

    <p>
        This is a paragraph containing
        <strong>bold text</strong>,
        <em>italic text</em>,
        <u>underlined text</u>,
        <s>strikethrough text</s>,
        <mark>highlighted text</mark>,
        <small>small text</small>,
        <del>deleted text</del>,
        <ins>inserted text</ins>,
        <sub>subscript</sub>,
        and
        <sup>superscript</sup>.
    </p>

    <!-- Line Break -->
    <p>
        Pak World Equestrian<br>
        Sialkot, Pakistan<br>
        Manufacturing Division
    </p>

    <!-- Link -->
    <p>
        Visit our
        <a href="https://www.degvora.com" target="_blank" rel="noopener noreferrer">
            website
        </a>
        to learn more.
    </p>

    <!-- Abbreviation -->
    <p>
        We use <abbr title="Research and Development">R&D</abbr>
        throughout our product development process.
    </p>

    <!-- Lists -->
    <h2>Our Core Values</h2>

    <ul>
        <li>Quality</li>
        <li>Innovation</li>
        <li>Reliability</li>
        <li>Customer Satisfaction</li>
        <li>Sustainable Manufacturing</li>
    </ul>

    <h2>Our Production Process</h2>

    <ol>
        <li>Material Selection</li>
        <li>Product Development</li>
        <li>Cutting & Preparation</li>
        <li>Manufacturing</li>
        <li>Quality Control</li>
        <li>Finishing</li>
        <li>Packaging</li>
    </ol>

    <!-- Nested Lists -->
    <h2>Our Products</h2>

    <ul>
        <li>
            Equestrian Equipment
            <ul>
                <li>Saddlery</li>
                <li>Bridles</li>
                <li>Horse Accessories</li>
            </ul>
        </li>

        <li>
            Custom Products
            <ul>
                <li>Custom Designs</li>
                <li>Custom Branding</li>
                <li>Sublimated Products</li>
            </ul>
        </li>
    </ul>

    <!-- Blockquote -->
    <blockquote>
        <p>
            Quality is not an act; it is the result of continuous attention
            to detail, craftsmanship, and commitment.
        </p>
        <cite>Pak World Equestrian</cite>
    </blockquote>

    <!-- Horizontal Rule -->
    <hr>

    <!-- Image -->
    <h2>Our Manufacturing Facility</h2>

    <figure>
        <img
            src="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=80"
            alt="Horse standing in a field"
            loading="lazy"
        >
        <figcaption>
            A visual representation of the equestrian industry.
        </figcaption>
    </figure>

    <!-- Image with link -->
    <p>
        <a href="https://www.degvora.com" target="_blank" rel="noopener noreferrer">
            <img
                src="https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?auto=format&fit=crop&w=1200&q=80"
                alt="Manufacturing facility"
                loading="lazy"
            >
        </a>
    </p>

    <!-- Table -->
    <h2>Manufacturing Capabilities</h2>

    <table>
        <caption>
            Our Production Capabilities
        </caption>

        <thead>
            <tr>
                <th>Department</th>
                <th>Capability</th>
                <th>Experience</th>
                <th>Status</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Product Development</td>
                <td>Custom Product Design</td>
                <td>33+ Years</td>
                <td>Active</td>
            </tr>

            <tr>
                <td>Manufacturing</td>
                <td>Equestrian Equipment</td>
                <td>33+ Years</td>
                <td>Active</td>
            </tr>

            <tr>
                <td>Sublimation</td>
                <td>Custom Printing</td>
                <td>10+ Years</td>
                <td>Active</td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <td colspan="2"><strong>Total Facility</strong></td>
                <td colspan="2"><strong>155,000 sq ft</strong></td>
            </tr>
        </tfoot>
    </table>

    <!-- Definition List -->
    <h2>Key Terms</h2>

    <dl>
        <dt>Sublimation</dt>
        <dd>
            A printing process that uses heat to transfer designs into
            suitable materials.
        </dd>

        <dt>R&D</dt>
        <dd>
            Research and development focused on improving products and
            manufacturing processes.
        </dd>

        <dt>Quality Control</dt>
        <dd>
            Inspection and verification processes used to maintain product
            standards.
        </dd>
    </dl>

    <!-- Code -->
    <h2>Technical Example</h2>

    <p>Example production status:</p>

    <pre><code>{
    "production": "active",
    "quality_control": true,
    "facility_size": "155,000 sq ft"
}</code></pre>

    <p>
        Use the <code>&lt;strong&gt;</code> element to emphasize important
        content.
    </p>

    <!-- Keyboard input -->
    <p>
        Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save your work.
    </p>

    <!-- Sample output -->
    <p>
        System status:
        <samp>Production completed successfully.</samp>
    </p>

    <!-- Variable -->
    <p>
        The production cost is represented by
        <var>totalCost</var>.
    </p>

    <!-- Quote -->
    <p>
        As part of our philosophy,
        <q>quality comes first</q>.
    </p>

    <!-- Date / Time -->
    <p>
        Established in
        <time datetime="1991">1991</time>.
    </p>

    <!-- Details / Summary -->
    <details>
        <summary>Learn more about our manufacturing process</summary>

        <p>
            Our manufacturing process combines experienced craftsmanship,
            modern equipment, quality control, and continuous improvement.
            Each production stage is monitored to maintain consistency
            and product quality.
        </p>
    </details>

    <!-- Address -->
    <h2>Contact Information</h2>

    <address>
        <strong>Pak World Equestrian</strong><br>
        Sialkot, Pakistan<br>
        Email:
        <a href="mailto:info@example.com">info@example.com</a><br>
        Phone:
        <a href="tel:+923000000000">+92 300 0000000</a>
    </address>

    <!-- Progress -->
    <h2>Production Progress</h2>

    <p>Current production capacity:</p>

    <progress value="75" max="100">75%</progress>

    <!-- Meter -->
    <p>Quality rating:</p>

    <meter min="0" max="100" value="95">
        95%
    </meter>

    <!-- Footer content -->
    <footer>
        <hr>

        <p>
            <small>
                © 2026 Pak World Equestrian. All rights reserved.
            </small>
        </p>
    </footer>
</article>
HTML,
                'meta_title' => 'Production Tour | Pak World Equestrian',
                'meta_description' => 'Explore the production facility, manufacturing processes, skilled craftsmanship, and quality control behind Pak World Equestrian products.',
                'canonical_url' => url('/production-tour'),
                'og_title' => 'Production Tour | Pak World Equestrian',
                'og_description' => 'Take a closer look at the production facility and manufacturing capabilities of Pak World Equestrian.',
                'og_image' => null,
                'status' => 'publish',
            ],

            [
                'name' => 'Sublimation Process',
                'slug' => 'sublimation-process',
                'content' => <<<'HTML'
<h2>What Is Sublimation?</h2>

<p>
    Sublimation is a specialized printing process that transfers designs directly
    into suitable materials using heat. The process allows detailed artwork,
    patterns, colors, and branding elements to become part of the material rather
    than simply sitting on its surface.
</p>

<h2>Design Preparation</h2>

<p>
    The process begins with preparing the required artwork and production design.
    Designs are carefully reviewed to ensure that dimensions, colors, patterns, and
    other visual elements are suitable for the final product.
</p>

<h2>Printing</h2>

<p>
    Once the design has been prepared, it is printed using specialized sublimation
    printing equipment and suitable sublimation inks. The printed design is then
    prepared for the heat-transfer stage.
</p>

<h2>Heat Transfer</h2>

<p>
    During the transfer stage, controlled heat and pressure are applied to the
    printed material. The ink changes into a gas and bonds with the appropriate
    fibers of the material, creating a durable and detailed finish.
</p>

<h2>Quality Inspection</h2>

<p>
    After sublimation, the printed material is inspected for color consistency,
    design accuracy, clarity, and overall finish. Additional production stages are
    then completed according to the requirements of the finished product.
</p>

<h2>Why Sublimation?</h2>

<p>
    Sublimation allows manufacturers to produce highly detailed designs with
    consistent colors and long-lasting visual results. It is particularly useful
    for customized products where complex graphics, patterns, and branding are
    required.
</p>

<p>
    At Pak World Equestrian, our sublimation capabilities support the production of
    visually detailed and professionally finished products while maintaining our
    focus on quality and consistency.
</p>
HTML,
                'meta_title' => 'Sublimation Process | Pak World Equestrian',
                'meta_description' => 'Learn how sublimation printing works and how Pak World Equestrian uses the process to create detailed and durable equestrian products.',
                'canonical_url' => url('/sublimation-process'),
                'og_title' => 'Sublimation Process | Pak World Equestrian',
                'og_description' => 'Learn more about the sublimation printing process used by Pak World Equestrian.',
                'og_image' => null,
                'status' => 'publish',
            ],

            [
                'name' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'content' => <<<'HTML'
<h2>Privacy Policy</h2>

<p>
    At Pak World Equestrian, we respect your privacy and are committed to protecting
    the information you provide when interacting with our website and services.
</p>

<h2>Information We Collect</h2>

<p>
    Depending on how you use our website, we may collect information such as your
    name, email address, phone number, company information, shipping or business
    details, and other information that you voluntarily provide through contact
    forms or inquiries.
</p>

<p>
    We may also collect basic technical information, such as browser type, device
    information, IP address, and website usage information, where applicable.
</p>

<h2>How We Use Your Information</h2>

<p>
    Information provided to us may be used to respond to inquiries, communicate
    with customers, process requests, provide services, improve our website and
    products, and maintain business records.
</p>

<h2>Information Protection</h2>

<p>
    We take reasonable measures to protect the information we collect from
    unauthorized access, misuse, alteration, or disclosure. However, no method of
    transmitting or storing information online can be guaranteed to be completely
    secure.
</p>

<h2>Sharing of Information</h2>

<p>
    We do not sell or rent your personal information. Information may be shared with
    trusted service providers or business partners where necessary to provide
    requested services, operate our website, or comply with applicable legal
    requirements.
</p>

<h2>Cookies</h2>

<p>
    Our website may use cookies or similar technologies to improve functionality,
    understand website usage, and provide a better browsing experience.
</p>

<h2>Third-Party Websites</h2>

<p>
    Our website may contain links to third-party websites. We are not responsible
    for the privacy practices, content, or security of external websites. We
    recommend reviewing their respective privacy policies.
</p>

<h2>Policy Updates</h2>

<p>
    We may update this Privacy Policy from time to time. Any changes will be
    published on this page with the updated policy taking effect from the date of
    publication.
</p>

<h2>Contact Us</h2>

<p>
    If you have questions about this Privacy Policy or how your information is
    handled, please contact Pak World Equestrian through the contact information
    provided on our website.
</p>
HTML,
                'meta_title' => 'Privacy Policy | Pak World Equestrian',
                'meta_description' => 'Read the Pak World Equestrian Privacy Policy to learn how we collect, use, protect, and handle customer information.',
                'canonical_url' => url('/privacy-policy'),
                'og_title' => 'Privacy Policy | Pak World Equestrian',
                'og_description' => 'Learn how Pak World Equestrian handles and protects your information.',
                'og_image' => null,
                'status' => 'publish',
            ],

            [
                'name' => 'Terms & Conditions',
                'slug' => 'terms-and-conditions',
                'content' => <<<'HTML'
<h2>Terms & Conditions</h2>

<p>
    These Terms & Conditions govern your use of the Pak World Equestrian website.
    By accessing or using our website, you agree to comply with these terms.
</p>

<h2>Use of Website</h2>

<p>
    You agree to use this website only for lawful purposes and in a manner that
    does not interfere with the operation, security, or availability of the website.
</p>

<p>
    You must not attempt to gain unauthorized access to any part of the website,
    introduce malicious software, or use the website for fraudulent or unlawful
    activities.
</p>

<h2>Website Content</h2>

<p>
    The content published on this website, including text, images, graphics,
    product information, logos, and other materials, is provided for general
    informational and business purposes.
</p>

<p>
    We make reasonable efforts to keep information accurate and up to date, but we
    do not guarantee that every piece of information will always be complete,
    accurate, or current.
</p>

<h2>Intellectual Property</h2>

<p>
    Unless otherwise stated, the content and materials available on this website
    are owned by or licensed to Pak World Equestrian. They may not be copied,
    reproduced, modified, distributed, or commercially used without appropriate
    authorization.
</p>

<h2>Product Information</h2>

<p>
    Product specifications, designs, materials, colors, availability, and other
    details may change as part of our ongoing product development and manufacturing
    processes.
</p>

<p>
    Where products are customized or manufactured according to customer
    requirements, final specifications will be determined through the applicable
    quotation, order confirmation, or agreement.
</p>

<h2>Third-Party Links</h2>

<p>
    Our website may contain links to external websites operated by third parties.
    These links are provided for convenience, and Pak World Equestrian does not
    control or guarantee the content, availability, or policies of those websites.
</p>

<h2>Limitation of Liability</h2>

<p>
    To the extent permitted by applicable law, Pak World Equestrian shall not be
    responsible for losses arising from the use of or inability to use the website,
    interruptions to website availability, or reliance on information published
    on the website.
</p>

<h2>Changes to These Terms</h2>

<p>
    We reserve the right to modify these Terms & Conditions when necessary.
    Updated terms will be published on this page, and continued use of the website
    after changes are published constitutes acceptance of the updated terms.
</p>

<h2>Contact</h2>

<p>
    If you have any questions regarding these Terms & Conditions, please contact
    Pak World Equestrian through the contact details provided on our website.
</p>
HTML,
                'meta_title' => 'Terms & Conditions | Pak World Equestrian',
                'meta_description' => 'Read the Terms & Conditions governing the use of the Pak World Equestrian website and its content and services.',
                'canonical_url' => url('/terms-and-conditions'),
                'og_title' => 'Terms & Conditions | Pak World Equestrian',
                'og_description' => 'Review the terms and conditions for using the Pak World Equestrian website.',
                'og_image' => null,
                'status' => 'publish',
            ],
            [
                'name' => 'Production Tour',
                'slug' => 'production-tour',
                'content' => <<<'HTML'
<h2>Terms & Conditions</h2>

<p>
    These Terms & Conditions govern your use of the Pak World Equestrian website.
    By accessing or using our website, you agree to comply with these terms.
</p>

<h2>Use of Website</h2>

<p>
    You agree to use this website only for lawful purposes and in a manner that
    does not interfere with the operation, security, or availability of the website.
</p>

<p>
    You must not attempt to gain unauthorized access to any part of the website,
    introduce malicious software, or use the website for fraudulent or unlawful
    activities.
</p>

<h2>Website Content</h2>

<p>
    The content published on this website, including text, images, graphics,
    product information, logos, and other materials, is provided for general
    informational and business purposes.
</p>

<p>
    We make reasonable efforts to keep information accurate and up to date, but we
    do not guarantee that every piece of information will always be complete,
    accurate, or current.
</p>

<h2>Intellectual Property</h2>

<p>
    Unless otherwise stated, the content and materials available on this website
    are owned by or licensed to Pak World Equestrian. They may not be copied,
    reproduced, modified, distributed, or commercially used without appropriate
    authorization.
</p>

<h2>Product Information</h2>

<p>
    Product specifications, designs, materials, colors, availability, and other
    details may change as part of our ongoing product development and manufacturing
    processes.
</p>

<p>
    Where products are customized or manufactured according to customer
    requirements, final specifications will be determined through the applicable
    quotation, order confirmation, or agreement.
</p>

<h2>Third-Party Links</h2>

<p>
    Our website may contain links to external websites operated by third parties.
    These links are provided for convenience, and Pak World Equestrian does not
    control or guarantee the content, availability, or policies of those websites.
</p>

<h2>Limitation of Liability</h2>

<p>
    To the extent permitted by applicable law, Pak World Equestrian shall not be
    responsible for losses arising from the use of or inability to use the website,
    interruptions to website availability, or reliance on information published
    on the website.
</p>

<h2>Changes to These Terms</h2>

<p>
    We reserve the right to modify these Terms & Conditions when necessary.
    Updated terms will be published on this page, and continued use of the website
    after changes are published constitutes acceptance of the updated terms.
</p>

<h2>Contact</h2>

<p>
    If you have any questions regarding these Terms & Conditions, please contact
    Pak World Equestrian through the contact details provided on our website.
</p>
HTML,
                'meta_title' => 'Terms & Conditions | Pak World Equestrian',
                'meta_description' => 'Read the Terms & Conditions governing the use of the Pak World Equestrian website and its content and services.',
                'canonical_url' => url('/terms-and-conditions'),
                'og_title' => 'Terms & Conditions | Pak World Equestrian',
                'og_description' => 'Review the terms and conditions for using the Pak World Equestrian website.',
                'og_image' => null,
                'status' => 'publish',
            ],
        ];

        foreach ($pages as $page) {
            Page::updateOrCreate(
                ['slug' => $page['slug']],
                $page
            );
        }
    }
}
