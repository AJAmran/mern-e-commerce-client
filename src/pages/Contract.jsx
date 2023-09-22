import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const ContactPage = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const { handleSubmit, reset, register } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can handle form submission here
    reset(); // Reset the form after submission
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container p-8 mx-auto"
    >
      <div className="gap-6 md:flex md:justify-between md:items-center">
        {/* Contact Form */}
        <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 md:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                {...register("name")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block font-semibold text-gray-700">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                {...register("message")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </div>

        {/* Contact Details */}
        <div className="mt-8 md:mt-0 md:w-1/2">
          <h2 className="mb-4 text-3xl font-semibold">Contact Details</h2>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="text-xl text-blue-500" />
            <p className="ml-2 text-gray-700">
              Dhaka, Bangladesh
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaPhone className="text-xl text-blue-500" />
            <p className="ml-2 text-gray-700">+1 (123) 456-7890</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-xl text-blue-500" />
            <p className="ml-2 text-gray-700">contact@example.com</p>
          </div>
        </div>
      </div>

      {/* Location Map */}
      <div className="mt-8">
        <h2 className="mb-4 text-3xl font-semibold">Our Location</h2>
        <div className="overflow-hidden bg-gray-200 rounded-lg">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60225.99685615883!2d90.36595939252458!3d23.777218917066136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755aa57e7e51121%3A0xf3b4b17f164c1fd6!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1641053832544!5m2!1sen!2sus"
            width="100%"
            height="300"
            frameBorder="0"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
