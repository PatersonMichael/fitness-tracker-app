import Link from "next/link";
import { useEffect } from "react";

function HomePage() {
  return (
    <div className="container flex flex-col items-center justify-center h-[100vh]">
      <div className="text-primary font-Poppins font-bold text-[48px]">
        Hello!
      </div>
      <button className="bg-primary text-white font-Inter font-bold w-[163px] h-[49px] mt-[126px]">
        <Link href="/login">Login</Link>
      </button>
    </div>
  );
}

export default HomePage;
