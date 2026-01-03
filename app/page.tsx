
import Blogs from "@/components/home/Blog";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";



export default function Home() {
  return (
    <div className=" flex flex-col gap-4 ">
      <Services></Services>
      <Faq></Faq>
   <Blogs></Blogs>
   <Hero></Hero>

    </div>
  );
}
