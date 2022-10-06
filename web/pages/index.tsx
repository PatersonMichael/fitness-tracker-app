import Link from "next/link";
import { useEffect } from "react";

function HomePage() {
    return (
        <div className="container flex flex-col items-center justify-center h-[100vh]">
            <div className="text-primary font-Poppins font-bold text-[48px]">
                Hello!
            </div>
            <div className="w-[80vw] text-center font-Inter text-[22px] mt-10">
                <p>
                    Welcome to the greatest fitness tracker on this side of the
                    galaxy.
                </p>
            </div>
            <button className="bg-primary text-white font-Inter font-bold w-[163px] h-[49px] mt-[126px]">
                <Link href="/login">Login</Link>
            </button>
            <p className="mt-[24px]">
                New Here?{" "}
                <span className="font-inter text-[16px] text-secondary text-center">
                    <Link href="/signup">Sign Up</Link>
                </span>
            </p>
        </div>
    );
}

export default HomePage;
