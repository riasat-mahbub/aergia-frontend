"use client"
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import * as motion from "motion/react-client"
import { ChevronRight } from "lucide-react";

export default function Home() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleBuilder = () => {
    if(isLoggedIn){
      router.push('/cvs')
    }else{
      router.push('/login')
    }
  }


  return (
    <section className="lg:flex  lg:justify-center lg:items-center">
      <div className="mx-auto pt-8 text-center lg:pt-32 lg:text-left flex flex-col">
        <h1 className="text-primary pb-2 font-bold text-4xl md:text-7xl mt-44">
          Create a professional
          <br />
          resume in minutes
        </h1>
        <p className="mt-3 text-lg lg:mt-5 md:text-3xl mx-3 lg:mx-0">
         With <span className="text-emerald-700 font-bold">Aergia</span>, the free and powerful resume builder
        </p>
        <p className="mt-3 textmd lg:mt-5 md:text-xl mb-10 text-gray-700">
          Click the button below to get started 
        </p>
        <motion.div  whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
          onClick={handleBuilder} 
          className={`self-center lg:self-auto bg-emerald-500 hover:bg-emerald-700 text-white
            font-bold p-4 rounded-full w-44 lg:w-52 lg:text-xl cursor-pointer flex flex-row`}>
          
          Create Resume <span aria-hidden="true"> <ChevronRight/> </span>
        </motion.div>
        {/* <p className="mt-3 text-sm text-gray-600 lg:mt-36">
          Already have a resume? Test its ATS readability with the{" "}
          <Link href="/resume-parser" className="underline underline-offset-2">
            resume parser
          </Link>
        </p> */}
      </div>

    </section>
  );
};
