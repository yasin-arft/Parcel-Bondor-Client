import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import bannerBg from '../../../assets/image/bannerbg.jpg';

const Banner = () => {
  return (
    <section className="lg:h-[80vh] relative flex items-center justify-center bg-no-repeat bg-contain bg-bottom"
      style={{ backgroundImage: `url(${bannerBg})` }}>
      <div className="bg-[#071129] opacity-60 h-full w-full absolute top-0 left-0"></div>
      <div className="z-10">
        <h1 className="text-5xl font-bold text-center text-white">Parcel Bondor - Guardian of Your Parcels</h1>
        <form className="mx-auto max-w-max mt-10">
          <div className="flex gap-3 items-center">
            <Input type="text" name="search" placeholder="Search..." />
            <Button type="submit" className="bg-red-light hover:bg-red-deep" disabled>Search</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Banner;