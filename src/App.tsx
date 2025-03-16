import React, { useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { motion } from "framer-motion";
import { projects } from "./data";
import { ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";

function App() {
  const contactRef = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await emailjs.sendForm(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        form.current,
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      form.current.reset();
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <main className="relative w-full overflow-x-hidden overflow-y-auto">
        {/* Hero Section */}
        <section
          id="home"
          className="h-screen relative flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1452587925148-ce544e77e70d')",
              filter: "brightness(0.7)",
            }}
          />
          <div className="relative z-10 text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Capturing Moments,
              <br />
              Creating Stories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl mb-8"
            >
              Professional photography that tells your unique story
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
            >
              View Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="min-h-screen py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-12"
            >
              Portfolio
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                      <div>
                        <h3 className="text-2xl font-semibold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-200">{project.description}</p>
                        <span className="inline-block mt-4 px-4 py-2 border border-white rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-center mb-12"
            >
              About Me
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5"
                  alt="Photographer"
                  className="rounded-lg shadow-xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-600 mb-8">
                  Passionate photographer with a keen eye for capturing life's
                  precious moments. Every shot tells a unique story, crafted
                  with creativity and attention to detail.
                </p>
                <div className="flex flex-col md:grid md:grid-cols-3 gap-6 items-center text-center">
                  {[
                    { number: "8+", label: "Years Experience" },
                    { number: "500+", label: "Photo Sessions" },
                    { number: "50+", label: "Wedding Events" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="w-64 md:w-full py-2 md:py-4 px-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="text-2xl font-bold text-amber-600">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="min-h-screen py-24 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                Services & Expertise
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Crafting visual stories through the lens of creativity and
                passion
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  title: "Wedding Photography",
                  icon: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
                  description:
                    "Capturing the magic of your special day with timeless elegance and authenticity.",
                  features: [
                    "Engagement Sessions",
                    "Full Day Coverage",
                    "Digital Gallery",
                    "Premium Album",
                  ],
                  price: "Starting at $2,500",
                },
                {
                  title: "Portrait Sessions",
                  icon: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
                  description:
                    "Professional portraits that reflect your personality and tell your unique story.",
                  features: [
                    "Indoor/Outdoor",
                    "Multiple Outfits",
                    "Retouching",
                    "Digital Delivery",
                  ],
                  price: "Starting at $500",
                },
                {
                  title: "Event Coverage",
                  icon: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800",
                  description:
                    "Dynamic event photography that captures the energy and excitement of your occasion.",
                  features: [
                    "Corporate Events",
                    "Social Gatherings",
                    "Quick Turnaround",
                    "Online Gallery",
                  ],
                  price: "Starting at $1,000",
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center text-gray-600"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-amber-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="text-center pt-4 border-t border-gray-100">
                      <span className="text-lg font-semibold text-amber-600">
                        {service.price}
                      </span>
                    </div>
                  </div>
                  {service.title === "Portrait Sessions" && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 rounded-bl-lg text-sm font-medium shadow-lg transform md:scale-0 md:group-hover:scale-100 scale-100 transition-transform duration-300 ease-out z-10">
                      Popular Choice ⭐
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <button
                onClick={() => {
                  const contactElement = document.getElementById("contact");
                  if (contactElement) {
                    // Use scrollIntoView with a smooth behavior
                    contactElement.scrollIntoView({ 
                      behavior: "smooth",
                      block: "start"
                    });
                    
                    // For mobile compatibility, also add a direct scroll after a small delay
                    setTimeout(() => {
                      const yOffset = -80;
                      const y = contactElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                      });
                    }, 100);
                  }
                }}
                className="inline-flex items-center px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl"
              >
                Book a Session
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real stories from our amazing clients who trusted us with their
                precious moments
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  name: "Sarah & James",
                  role: "Wedding Couple",
                  image:
                    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=200",
                  quote:
                    "Our wedding photos are absolutely stunning! They captured every special moment perfectly, and the attention to detail was amazing.",
                  rating: 5,
                },
                {
                  name: "Emily Chen",
                  role: "Portrait Client",
                  image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
                  quote:
                    "The portrait session was so fun and comfortable. The photos truly reflect my personality, and I couldn't be happier with the results!",
                  rating: 5,
                },
                {
                  name: "Michael Rodriguez",
                  role: "Corporate Event Manager",
                  image:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
                  quote:
                    "Professional, punctual, and produced amazing photos of our corporate event. Will definitely hire again!",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative bg-white p-8 rounded-2xl shadow-xl"
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-4 ring-white">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-amber-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 01-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <blockquote className="text-gray-700 text-center mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="text-center">
                      <h4 className="font-semibold text-lg text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-amber-600 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="absolute -left-2 -top-2">
                    <svg
                      className="w-8 h-8 text-amber-400 opacity-50"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <div
          ref={contactRef}
          id="contact"
          className="min-h-screen py-24 bg-gradient-to-b from-white to-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                Let's Create Something Beautiful
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to capture your special moments? Get in touch and let's
                discuss your photography needs.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-xl"
              >
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Service Interest
                    </label>
                    <select
                      name="service"
                      id="service"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option value="wedding">Wedding Photography</option>
                      <option value="portrait">Portrait Sessions</option>
                      <option value="event">Event Coverage</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-colors"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  {submitStatus.type && (
                    <div
                      className={`p-4 rounded-lg ${
                        submitStatus.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-amber-500 text-white py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-amber-600"
                    }`}
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Phone
                    </h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600">contact@lensandlight.com</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      Studio Location
                    </h3>
                    <p className="text-gray-600">
                      123 Photography Lane
                      <br />
                      Artistic District, CA 90210
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    {[
                      {
                        name: "Instagram",
                        icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-1.38-.898-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
                      },
                      {
                        name: "Facebook",
                        icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                      },
                      {
                        name: "Twitter",
                        icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                      },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={`#${social.name.toLowerCase()}`}
                        className="bg-gray-100 p-3 rounded-lg hover:bg-amber-100 transition-colors group"
                      >
                        <svg
                          className="w-5 h-5 text-gray-600 group-hover:text-amber-600"
                          viewBox="0 0 24 24"
                        >
                          <path fill="currentColor" d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
