
import Blogs from "@/components/home/Blog";
import Faq from "@/components/home/Faq";
import Banner from "@/components/home/Banner";
import Services from "@/components/home/Services";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import FoodMenu from "@/components/home/FoodMenu";
import Store from "@/components/home/Store";



export default function Home() {
  return (
    <div className=" flex flex-col mt-5 md:pt-10">
      <Hero></Hero>
       <About></About>
<div className="w-11/12 mx-auto ">

  <Services></Services>
  <FoodMenu></FoodMenu>
      <Faq></Faq>
      <Store></Store>
   <Blogs></Blogs>
   <Banner></Banner>
</div>
    </div>
  );
}
