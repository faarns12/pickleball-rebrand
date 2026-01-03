"use client"
import React from 'react';
import Image from 'next/image';
import {  PhoneCall,  } from 'lucide-react';

// Services data
const servicesData = [
  {
    id: "01",
    title: "Tournaments & Events",
    description: "From court reservations to professional coaching, we provide everything to make your pickleball journey exceptional.",
    image: "/Services1.jpg"
  },
  {
    id: "02",
    title: "Pro Shop & Gear",
    description: "From court reservations to professional coaching, we provide everything to make your pickleball journey exceptional.",
    image: "/Services2.png"
  },
  {
    id: "03",
    title: "On-Court Dining",
    description: "From court reservations to professional coaching, we provide everything to make your pickleball journey exceptional.",
    image: "/Services3.jpg"
  }
];

const Services = () => {
  return (
    <section className=" py-10 px-2">
      <div className=" mx-auto">
        {/* Top Badge */}
        <div className="flex justify-center mb-2">
          
           <div className="inline-flex items-center gap-2 bg-[#F7F7F7] text-[#F63F00] px-4 py-2 rounded-full font-geist mb-4">
                      <Image src="/blog.svg" alt="Blog" width={18} height={18} />
                      <span className="font-medium">Our Services/Programs</span>
                    </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-[64px] font-geist font-bold mb-4">
            <div className="text-[#707070]  ">Empowering</div>
            <div className="text-[#0A0A0A]">Professional Services</div>
          </h2>
          <p className="text-[#707070] font-geist xl md:text-2xl  mx-auto">
            From court reservations to professional coaching, we provide everything to <br className='hidden md:block'/>
            make your pickleball journey exceptional.
          </p>
        </div>

        {/* Reserve Button */}
        <div className="flex justify-center mb-10 md:mb-16">
          <button className="bg-[#0A2C23] hover:to-red-700 text-xs shadow-[20px_20px_28.28px_-2px_rgba(0,0,0,0.15),7.87px_7.87px_11.13px_-1.6px_rgba(0,0,0,0.12)] md:text-sm lg:text-base font-medium font-geist text-[#FFFFFF] px-3 py-2.5 rounded-[14px] flex items-center gap-2 transition-colors">
           <span className=' px-3 py-3 bg-[#F63F00] rounded-[14px]'> <PhoneCall   className='w-5'/></span>
                Reserve Your Spot
          </button>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="relative h-80 md:h-100 rounded-[50px] overflow-hidden group cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/60 transition-colors duration-300"></div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-8 text-white">
                {/* Number */}
                <div className="text-[30px] md:text-[45px] font-geist text-[#FFFFFF]">
                  {service.id}
                </div>

                {/* Bottom Content */}
                <div>
                  <h3 className="font-geist text-[#FFFFFF] font-semibold text-2xl md:text-[30px] mb-3">
                    {service.title}
                  </h3>
                  <p className="font-geist text-[#FFFFFF] md:text-lg text-sm  leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;