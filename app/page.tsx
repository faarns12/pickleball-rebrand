import Blogs from "@/components/home/Blog";
import Faq from "@/components/home/Faq";
import Banner from "@/components/home/Banner";
import Services from "@/components/home/Services";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import FoodMenu from "@/components/home/FoodMenu";
import Store from "@/components/home/Store";
import { getActiveBlogs } from "@/lib/blogs";

export default async function Home() {
  const blogs = await getActiveBlogs();

  return (
    <div className="flex flex-col mt-5 md:pt-10">
      <Hero />
      <About />
      <div className="w-11/12 mx-auto">
        <Services />
        <FoodMenu />
        <Faq />
        <Store />
        <Blogs blogs={blogs} />
        <Banner />
      </div>
    </div>
  );
}
