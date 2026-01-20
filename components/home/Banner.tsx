"use client";
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

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
    arrivalTime: [] as string[], // CHANGED: Array instead of string
    instructions: "",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // NEW: Handler for toggling time slots
  const handleTimeSlotToggle = (timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      arrivalTime: prev.arrivalTime.includes(timeSlot)
        ? prev.arrivalTime.filter(t => t !== timeSlot)
        : [...prev.arrivalTime, timeSlot]
    }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const data = new FormData();
      data.append(ENTRY_IDS.fullName, formData.fullName);
      data.append(ENTRY_IDS.email, formData.email);
      data.append(ENTRY_IDS.date, formData.date);
      data.append(ENTRY_IDS.arrivalTime, formData.arrivalTime.join(", ")); // CHANGED: Join array
      data.append(ENTRY_IDS.instructions, formData.instructions);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

      alert("Court booking submitted! 🎾");

      setFormData({
        fullName: "",
        email: "",
        date: "",
        arrivalTime: [], // CHANGED: Empty array
        instructions: "",
      });
    } catch (error) {
      console.error(error);
      alert("Please try again");
    }
  };

  const timeSlots = [
    { value: "10:00-10:45", label: "10:00 AM - 10:45 AM" },
    { value: "10:45-11:30", label: "10:45 AM - 11:30 AM" },
    { value: "11:30-12:15", label: "11:30 AM - 12:15 PM" },
    { value: "12:15-13:00", label: "12:15 PM - 1:00 PM" },
    { value: "13:00-13:45", label: "1:00 PM - 1:45 PM" },
    { value: "13:45-14:30", label: "1:45 PM - 2:30 PM" },
    { value: "14:30-15:15", label: "2:30 PM - 3:15 PM" },
    { value: "15:15-16:00", label: "3:15 PM - 4:00 PM" },
    { value: "16:00-16:45", label: "4:00 PM - 4:45 PM" },
    { value: "16:45-17:30", label: "4:45 PM - 5:30 PM" },
    { value: "17:30-18:15", label: "5:30 PM - 6:15 PM" },
    { value: "18:15-19:00", label: "6:15 PM - 7:00 PM" },
    { value: "19:00-19:45", label: "7:00 PM - 7:45 PM" },
    { value: "19:45-20:30", label: "7:45 PM - 8:30 PM" },
    { value: "20:30-21:15", label: "8:30 PM - 9:15 PM" },
    { value: "21:15-22:00", label: "9:15 PM - 10:00 PM" },
    { value: "22:00-22:45", label: "10:00 PM - 10:45 PM" },
    { value: "22:45-23:30", label: "10:45 PM - 11:30 PM" },
    { value: "23:30-00:15", label: "11:30 PM - 12:15 AM" },
    { value: "00:15-00:45", label: "12:15 AM - 12:45 AM" }
  ];

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
            Tell us what you're looking for, and our team will help you find the perfect
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
                  type="text"
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

              {/** Arrival Time - MULTI-SELECT **/}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="w-full"
              >
                <label
                  htmlFor="arrivalTime"
                  className="block text-base sm:text-lg font-geist text-white mb-2 sm:mb-3"
                >
                  Expected Arrival Time
                </label>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base sm:text-lg font-geist bg-[#dddbd8] border-2 border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-[#707070] font-medium shadow-[0px_3px_4px_2px_#564F5C33] text-left flex justify-between items-center"
                  >
                    <span className="truncate">
                      {formData.arrivalTime.length === 0
                        ? "Select time slots..."
                        : `${formData.arrivalTime.length} slot${formData.arrivalTime.length > 1 ? 's' : ''} selected`}
                    </span>
                    <svg className="w-5 h-5 ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-20 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {timeSlots.map((slot) => {
                        const isSelected = formData.arrivalTime.includes(slot.value);
                        return (
                          <div
                            key={slot.value}
                            onClick={() => handleTimeSlotToggle(slot.value)}
                            className={`px-4 py-2 cursor-pointer hover:bg-[#F63F00] hover:text-white transition-colors ${
                              isSelected ? 'bg-[#F63F00] text-white' : 'text-gray-700'
                            }`}
                          >
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => {}}
                                className="mr-3 w-4 h-4 accent-[#F63F00]"
                              />
                              <span className="font-geist text-sm sm:text-base">{slot.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
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