import React from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactPage = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container p-8 mx-auto"
    >
      <div className="md:flex md:justify-between">
        {/* Contact Form */}
        <div className="md:w-1/2">
          <h2 className="mb-6 text-3xl font-semibold">Contact Us</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block font-semibold text-gray-800">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
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
            <p className="ml-2 text-gray-800">
              123 Main Street, Cityville, Country
            </p>
          </div>
          <div className="flex items-center mb-4">
            <FaPhone className="text-xl text-blue-500" />
            <p className="ml-2 text-gray-800">+1 (123) 456-7890</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-xl text-blue-500" />
            <p className="ml-2 text-gray-800">contact@example.com</p>
          </div>
        </div>
      </div>

      {/* Location Map */}
      <div className="mt-8">
        <h2 className="mb-4 text-3xl font-semibold">Our Location</h2>
        <div className="overflow-hidden bg-gray-200 rounded-lg">
          {/* Replace the following iframe with an actual map */}
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.6789!2d-12.3456789!3d12.3456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU5JzI2LjQiTiAxMsKwMDAnNTMuOSJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
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
