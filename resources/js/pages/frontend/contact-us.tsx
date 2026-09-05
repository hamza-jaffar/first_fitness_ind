import FrontendBreadcrumb from '@/components/frontend/breadcrumb'
import React, { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Form, Head } from '@inertiajs/react'
import { generateCaptcha } from '@/lib/utils'
import { contactstore } from '@/routes'
import InputError from '@/components/input-error'
import { Spinner } from '@/components/ui/spinner'

const ContactUs = () => {
  const [captchaCode, setCaptchaCode] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  useEffect(() => {
    setCaptchaCode(generateCaptcha())
  }, [])

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha())
    setCaptchaError('')
  }

  const inputClasses =
    'w-full rounded-sm bg-gray-100 border border-gray-200 px-4 py-3 text-sm text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300'

  return (
    <div>
      <Head>
        <title>Contact Us</title>

        <meta
          name="description"
          content="Contact First Fitness for inquiries, support, product information, and business-related questions. Get in touch with our team today."
        />

        <meta
          name="keywords"
          content="contact First Fitness, First Fitness contact, fitness equipment, fitness products, fitness support"
        />

        <meta name="robots" content="index, follow" />

        <meta
          property="og:title"
          content="Contact Us | First Fitness"
        />

        <meta
          property="og:description"
          content="Get in touch with First Fitness for inquiries, support, product information, and business-related questions."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Contact Us | First Fitness"
        />

        <meta
          name="twitter:description"
          content="Contact First Fitness for inquiries, support, and business-related questions."
        />
      </Head>
      <FrontendBreadcrumb name="Contact us" />
      <div className="my-15 mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

        <Form {...contactstore.form()} className="space-y-5">
          {({ processing, errors }) => (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>

                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name:"
                    className={inputClasses}
                  />
                  <InputError message={errors.full_name} />
                </div>

                <div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address:"
                    className={inputClasses}
                  />
                  <InputError message={errors.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    name="phone_no"
                    placeholder="Phone No"
                    className={inputClasses}
                  />
                  <InputError message={errors.phone} />
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className={inputClasses}
                  />
                  <InputError message={errors.subject} />

                </div>
              </div>

              <textarea
                name="comment"
                placeholder="Comments"
                rows={6}
                className={`${inputClasses} resize-y`}
              />
              <InputError message={errors.comment} />

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-black text-white text-sm font-semibold tracking-wide py-4 rounded-sm hover:bg-gray-900 transition-colors"
              >

                {processing ? <div className='w-fit mx-auto flex gap-2 items-center'><Spinner /> SUBMITING...</div> : 'SUBMIT'}
              </button>
            </>
          )}
        </Form>
      </div>
    </div>
  )
}

export default ContactUs