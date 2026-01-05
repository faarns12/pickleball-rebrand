import React from "react";
import Image from "next/image";

export default function About() {
  return (
    <div className="  flex flex-col items-center   ">
      {/* About Us Button */}
        <div className="flex justify-center mb-2">
                <div className="inline-flex items-center gap-2 bg-[#F7F7F7] text-[#F63F00] px-4 py-2 rounded-full font-geist ">
                  <Image src="/about.svg" alt="Blog" width={18} height={18} />
                  <span className="font-medium">About Us</span>
                </div>
              </div>
      <p className="font-geist text-[22px] md:text-[40px] max-w-337.5 mx-auto lg:text-[45px] py-8 px-4 md:px-0">
        The Pickleball{" "}
        <span className="inline-flex">
          <Image
            src="/about1.svg"
            alt="Court icon"
            width={38}
            height={38}
            unoptimized
             className="md:w-17.5 md:h-10.5 w-12 h-6"
          />
        </span>{" "}
        Revolution Starts here. This is a landmark moment: the first time ever a
        dedicated{" "}
        <span className="inline-flex">
          <Image
            src="/about2.svg"
            alt="Court icon"
            width={38}
            height={38}
            unoptimized
             className="md:w-17.5 md:h-10.5 w-12 h-6"
          />
        </span>{" "}
        Pickleball court and restaurant is opening{" "}
        <span className="inline-flex ">
          <Image
            src="/about3.svg"
            alt="Court icon"
            width={38}
            height={38}
            unoptimized
            className="md:w-17.5 md:h-10.5 w-12 h-6"
          />
        </span>
        in Bangladesh. We are pioneering this exciting sport in the country,
        building the trend from the ground up and inviting you to be part of
        this historic first chapter.
      </p>
    </div>
  );
}
