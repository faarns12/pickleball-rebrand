import About from "@/components/home/About";
import Blogs from "@/components/home/Blog";
import Hero from "@/components/home/Hero";



export default function Home() {
  return (
    <div className=" flex flex-col gap-4 ">
   <About></About>
   <Blogs></Blogs>
   <Hero></Hero>

    </div>
  );
}
