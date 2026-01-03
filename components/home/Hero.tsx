"use client"
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

const BookingSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    arrivalTime: '',
    instructions: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
    alert('Court booking submitted!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative w-full min-h-128 flex items-center justify-center py-7.5 px-2 md:px-15.25 mb-5">
      {/* Background Image */}
      <div 
        className="absolute  rounded-[25px] inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/banner.png")',
        }}
      >
        <div className="absolute inset-0  rounded-[25px] bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full ">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-[40px] md:text-[60px] lg:text-[100px] font-bold text-[#FFFFFF] mb-4 drop-shadow-lg font-geist">
            Ready to Play?
          </h1>
          <p className="text-white text-sm md:text-xl font-geist   max-w-3xl mx-auto ">
            Tell us what you`re looking for, and our team will help you find the perfect
            student accommodation — quick, simple, and stress-free.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Row 1: Full Name, Date, Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-lg font-geist text-[#FFFFFF] mb-2">
                  Full Name
                </label>
                <select
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg font-geist bg-[#dddbd8] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-[#707070] font-medium shadow-[0px_3px_4px_2px_#564F5C33]"
                >
                 
                  <option value="monash">Monash University</option>
                  <option value="melbourne">University of Melbourne</option>
                  <option value="rmit">RMIT University</option>
                </select>
                
              </div>

              {/* Date */}
              <div>
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
                    className="w-full px-4 py-3 text-lg font-geist bg-[#dddbd8] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-[#707070] font-medium "
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2  pointer-events-none" size={20} />
                </div>
              </div>

              {/* Instructions */}
              <div>
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
              </div>
            </div>

            {/* Row 2: Email, Arrival Time, Button */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Email */}
              <div>
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
              </div>

              {/* Expected Arrival Time */}
              <div>
                <label htmlFor="arrivalTime" className="block text-lg font-geist text-[#FFFFFF] mb-2">
                  Expected Arrival Time
                </label>
                <select
                  id="arrivalTime"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-lg font-geist bg-[#dddbd8] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-[#707070] font-medium shadow-[0px_3px_4px_2px_#564F5C33]"
                >
                  <option value="">Select time...</option>
                  <option value="7pm-8pm">7PM - 8PM</option>
                  <option value="8pm-9pm">8PM - 9PM</option>
                  <option value="9pm-10pm">9PM - 10PM</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-3 text-lg font-geist bg-[#F63F00] border-2 border-white rounded-lg truncate focus:outline-none focus:ring-2 focus:ring-[#ff6900] text-white font-medium shadow-[0px_3px_4px_2px_#564F5C33]"
              >
                Book My Court
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;