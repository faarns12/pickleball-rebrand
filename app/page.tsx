
import Blogs from "@/components/home/Blog";
import Faq from "@/components/home/Faq";
import Banner from "@/components/home/Banner";
import Services from "@/components/home/Services";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";



export default function Home() {
  return (
    <div className=" flex flex-col  ">
      <Hero></Hero>
       <About></About>
<div className="w-11/12 mx-auto">

  <Services></Services>
      <Faq></Faq>
   <Blogs></Blogs>
   <Banner></Banner>
</div>
    </div>
  );
}
