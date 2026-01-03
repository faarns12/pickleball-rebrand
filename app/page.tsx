import About from "@/components/home/About";
import Hero from "@/components/home/Hero";



export default function Home() {
  return (
    <div className=" flex flex-col gap-7 ">
   <About></About>
   <Hero></Hero>
    </div>
  );
}
