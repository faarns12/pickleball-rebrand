
import Blogs from "@/components/home/Blog";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";



export default function Home() {
  return (
    <div className=" flex flex-col gap-4 ">
      <Faq></Faq>
   <Blogs></Blogs>
   <Hero></Hero>

    </div>
  );
}
