"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { trackFormStart, trackFormSubmit, trackFormError } from "@/components/Analytics"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Shield, Award, Phone, Clock, DollarSign } from "lucide-react"

const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  phone: z.string().regex(/^[\d\s\-\(\)]+$/, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  zipCode: z.string().optional(),
  bestTimeToCall: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isHeroSubmitting, setIsHeroSubmitting] = useState(false)
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const {
    register: registerHero,
    handleSubmit: handleSubmitHero,
    formState: { errors: errorsHero },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Send to CRM
      console.log("Form submitted:", data)
      trackFormSubmit()
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      trackFormError("submission_failed")
      setIsSubmitting(false)
    }
  }

  const handleFormInteraction = () => {
    trackFormStart()
  }

  const onHeroSubmit = async (data: FormData) => {
    setIsHeroSubmitting(true)
    try {
      // TODO: Send to CRM
      console.log("Hero form submitted:", data)
      trackFormSubmit()
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsHeroSubmitting(false)
      setIsHeroSubmitted(true)
    } catch (error) {
      trackFormError("hero_submission_failed")
      setIsHeroSubmitting(false)
    }
  }

  const trustBadges = [
    { icon: Shield, text: "BBB Accredited" },
    { icon: Award, text: "Since 1994" },
    { icon: Star, text: "5-Star Rated" },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-yellow-100 opacity-50" />
        
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Turn Your Jewelry Into <span className="text-yellow-600">Cash Today</span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8">
                Philadelphia&apos;s most trusted diamond and jewelry buyer. Get top dollar for your gold, diamonds, and estate jewelry with our free, no-obligation valuation.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mb-8">
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <badge.icon className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-semibold text-gray-700">{badge.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Inline Lead Form for Hero Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/90 backdrop-blur p-6 rounded-xl shadow-lg border border-gray-100 mb-8"
              >
                <h3 className="text-lg font-semibold mb-4">Get Your Free Valuation</h3>
                {!isHeroSubmitted ? (
                  <form onSubmit={handleSubmitHero(onHeroSubmit)} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Input
                        {...registerHero("firstName")}
                        placeholder="First Name *"
                        className={`w-full ${errorsHero.firstName ? "border-red-500" : ""}`}
                        onFocus={handleFormInteraction}
                      />
                      {errorsHero.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errorsHero.firstName.message}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        {...registerHero("phone")}
                        placeholder="Phone Number *"
                        className={`w-full ${errorsHero.phone ? "border-red-500" : ""}`}
                      />
                      {errorsHero.phone && (
                        <p className="text-red-500 text-xs mt-1">{errorsHero.phone.message}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <Input
                        type="email"
                        {...registerHero("email")}
                        placeholder="Email Address *"
                        className={`w-full ${errorsHero.email ? "border-red-500" : ""}`}
                      />
                      {errorsHero.email && (
                        <p className="text-red-500 text-xs mt-1">{errorsHero.email.message}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="bg-yellow-600 hover:bg-yellow-700 font-semibold whitespace-nowrap"
                      disabled={isHeroSubmitting}
                    >
                      {isHeroSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        "Get Cash Offer"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center">
                    <p className="text-green-600 font-semibold">Thank you! We'll contact you within 24 hours.</p>
                  </div>
                )}
              </motion.div>

              {/* Hero Image for Mobile */}
              <div className="lg:hidden mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=2086"
                  alt="10 carat luxury diamond ring"
                  className="rounded-lg shadow-xl w-full h-[300px] object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Get Your Cash Offer
                  </h2>
                  <p className="text-gray-600">
                    No Obligation • Free Valuation • Instant Quote
                  </p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        placeholder="John"
                        className={errors.firstName ? "border-red-500" : ""}
                        onFocus={handleFormInteraction}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="(215) 555-0123"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="zipCode">Zip Code (Optional)</Label>
                      <Input
                        id="zipCode"
                        {...register("zipCode")}
                        placeholder="19103"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bestTimeToCall">Best Time to Call (Optional)</Label>
                      <Select onValueChange={(value) => setValue("bestTimeToCall", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12pm - 5pm)</SelectItem>
                          <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
                          <SelectItem value="anytime">Any Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 text-lg font-semibold bg-yellow-600 hover:bg-yellow-700"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        "Get My Cash Offer"
                      )}
                    </Button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      <Shield className="w-3 h-3 inline mr-1" />
                      Your information is secure and will never be shared
                    </p>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600 mb-4">
                      We&apos;ve received your information and will call you within 24 hours.
                    </p>
                    <p className="text-sm text-gray-500">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Or call us now at (215) 555-0123
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Desktop Hero Image */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[600px]">
            <img 
              src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=2086"
              alt="10 carat luxury diamond ring"
              className="w-full h-full object-cover rounded-l-3xl shadow-2xl"
            />
            <div className="absolute bottom-8 right-8 bg-black/80 text-white p-4 rounded-lg backdrop-blur">
              <p className="text-2xl font-bold">10 Carat Diamond</p>
              <p className="text-lg">Top Dollar Paid</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to get cash for your jewelry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Submit Your Info",
                description: "Fill out our quick form to get started",
                icon: "📝",
              },
              {
                step: "2",
                title: "Get Your Valuation",
                description: "Our experts provide a fair market assessment",
                icon: "💎",
              },
              {
                step: "3",
                title: "Receive Cash",
                description: "Accept our offer and get paid immediately",
                icon: "💵",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-yellow-600 font-bold text-lg mb-2">Step {item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                location: "Philadelphia, PA",
                text: "D. Atlas gave me the best price for my grandmother's diamond ring. Professional and trustworthy!",
                rating: 5,
              },
              {
                name: "Michael R.",
                location: "Haverford, PA",
                text: "Quick, easy process. They paid cash on the spot. Highly recommend for anyone selling jewelry.",
                rating: 5,
              },
              {
                name: "Jennifer L.",
                location: "Main Line, PA",
                text: "Fair prices and excellent service. They explained everything clearly and made me feel comfortable.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="text-sm">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-600">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How do you determine the value of my jewelry?",
                answer: "We use current market prices for gold, diamonds, and precious stones, combined with our expertise in evaluating quality, craftsmanship, and brand value.",
              },
              {
                question: "Do I need an appointment?",
                answer: "While walk-ins are welcome, we recommend scheduling an appointment to ensure our expert appraisers can give you their full attention.",
              },
              {
                question: "What types of jewelry do you buy?",
                answer: "We buy all types of fine jewelry including diamonds, gold, platinum, silver, luxury watches, and estate jewelry from any era.",
              },
              {
                question: "How quickly will I get paid?",
                answer: "If you accept our offer, we pay cash immediately. For larger transactions, we can also arrange bank transfers or certified checks.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-4">D. Atlas Estates</h3>
              <p className="text-gray-400">
                Philadelphia&apos;s trusted jewelry buyer since 1994
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                <Phone className="w-4 h-4 inline mr-2" />
                (215) 555-0123
              </p>
              <p className="text-gray-400 mt-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Mon-Sat: 10am - 6pm
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Location</h4>
              <p className="text-gray-400">
                510 W Lancaster Ave<br />
                Haverford, PA 19041
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; 2025 D. Atlas Estates. All rights reserved.</p>
            <p className="mt-2">
              <a href="#" className="hover:text-white">Privacy Policy</a> | 
              <a href="#" className="hover:text-white ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}