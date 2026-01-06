"use client";
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
/* ================= GOOGLE FORM CONFIG ================= */

const GOOGLE_FORM_ID = "1FAIpQLSfieeagrmUalhla5yKX7Rr_cEz7J_cRainYT3ymQRS2nezvWw";

const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

const ENTRY_IDS = {
  fullName: "entry.445707519",
  email: "entry.808386376",
  date: "entry.1418185125",
  arrivalTime: "entry.1055562500",
  instructions: "entry.1574992862",
};

const Banner = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    date: "",
    arrivalTime: "",
    instructions: "",
  });

  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.date) {
    toast.error("Please fill all required fields.");
      return;
    }

    try {
      const data = new FormData();
      data.append(ENTRY_IDS.fullName, formData.fullName);
      data.append(ENTRY_IDS.email, formData.email);
      data.append(ENTRY_IDS.date, formData.date);
      data.append(ENTRY_IDS.arrivalTime, formData.arrivalTime);
      data.append(ENTRY_IDS.instructions, formData.instructions);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

     
       toast.success("Court booking submitted! 🎾");

      setFormData({
        fullName: "",
        email: "",
        date: "",
        arrivalTime: "",
        instructions: "",
      });
    } catch (error) {
      console.error(error);
   
          toast.error("Please try again");

    }
  };
  return (
    <motion.section
      id='Reserve'
      className="relative pt-20 w-full min-h-128 flex items-center justify-center py-7.5 px-2 md:px-15.25 mb-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image */}
      <div 
        className="absolute rounded-[25px] inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/banner.png")' }}
      >
        <div className="absolute inset-0 rounded-[25px] bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-[40px] md:text-[60px] lg:text-[100px] font-bold text-[#FFFFFF] mb-4 drop-shadow-lg font-geist">
            Ready to Play?
          </h1>
          <p className="text-white text-sm md:text-xl font-geist max-w-3xl mx-auto">
            Tell us what you`re looking for, and our team will help you find the perfect
            student accommodation — quick, simple, and stress-free.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-6">
            {/* Row 1: Full Name, Date, Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/** Full Name **/}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label htmlFor="fullName" className="block text-lg font-geist text-[#FFFFFF] mb-2">
                  Full Name
                </label>
                 <input
                    type="fullName"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your Name"
                    className="w-full px-4 py-3 text-lg font-geist bg-[#dddbd8] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-[#707070] font-medium"
                  />
                
              </motion.div>

              {/** Date **/}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label htmlFor="date" className="block text-lg font-geist text-[#FFFFFF] mb-2">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    placeholder="DD-MM-YYYY"
                    className="w-full px-4 py-3 text-lg font-geist bg-[#dddbd8] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-[#707070] font-medium"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" size={20} />
                </div>
              </motion.div>

              {/** Instructions **/}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="instructions" className="block text-lg font-geist text-[#FFFFFF] mb-2">
                  Any Instructions?
                </label>
                <input
                  type="text"
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  placeholder="2 club sandwiches and a coke upon arrival"
                  className="w-full px-4 py-3 text-lg font-geist bg-[#dddbd8] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-[#707070] font-medium shadow-[0px_3px_4px_2px_#564F5C33]"
                />
              </motion.div>
            </div>

            {/* Row 2: Email, Arrival Time, Button */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/** Email **/}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="email" className="block text-lg font-geist text-[#FFFFFF] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="abc@example.com"
                  className="w-full px-4 py-3 text-lg font-geist bg-[#dddbd8] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-[#707070] font-medium shadow-[0px_3px_4px_2px_#564F5C33]"
                />
              </motion.div>

          {/** Arrival Time **/}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.5, delay: 0.5 }}
  className="w-full"
>
  <label
    htmlFor="arrivalTime"
    className="
      block 
      text-base sm:text-lg 
      font-geist 
      text-white 
      mb-2 sm:mb-3
    "
  >
    Expected Arrival Time
  </label>

  <select
    id="arrivalTime"
    name="arrivalTime"
    value={formData.arrivalTime}
    onChange={handleChange}
    className="
      w-full
      px-3 sm:px-4
      py-2.5 sm:py-3
      text-base sm:text-lg
      font-geist
      bg-[#dddbd8]
      border-2 border-white
      rounded-lg
      focus:outline-none
      focus:ring-2 focus:ring-[#ff6900]
      text-[#707070] font-medium
      shadow-[0px_3px_4px_2px_#564F5C33]
      truncate
    "
  >
    <option value="">Select time...</option>

    <option value="10-10:45">10.00 AM - 10.45 AM</option>
    <option value="11-11:45">11.00 AM - 11.45 AM</option>
    <option value="12-12:45">12.00 PM - 12.45 PM</option>
    <option value="13-13:45">1.00 PM - 1.45 PM</option>
    <option value="14-14:45">2.00 PM - 2.45 PM</option>
    <option value="15-15:45">3.00 PM - 3.45 PM</option>
    <option value="16-16:45">4.00 PM - 4.45 PM</option>
    <option value="17-17:45">5.00 PM - 5.45 PM</option>
    <option value="18-18:45">6.00 PM - 6.45 PM</option>
    <option value="19-19:45">7.00 PM - 7.45 PM</option>
    <option value="20-20:45">8.00 PM - 8.45 PM</option>
    <option value="21-21:45">9.00 PM - 9.45 PM</option>
    <option value="22-22:45">10.00 PM - 10.45 PM</option>
    <option value="23-23:45">11.00 PM - 11.45 PM</option>
  </select>
</motion.div>


              {/** Submit Button **/}
              <motion.button
                onClick={handleSubmit}
                className="w-full px-4 py-3 text-lg font-geist bg-[#F63F00] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-white font-medium shadow-[0px_3px_4px_2px_#564F5C33]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Book My Court
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Banner;
