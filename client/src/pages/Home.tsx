import Collections from "../components/Collection";
import Footer5 from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Collections/>
      <Stats/>
      <Testimonials/>
      <NewsLetter/>
      <Footer5/>
    </div>
  );
};

export default Home;
