"use client"
import { useApi } from "@/hooks/useApi";
import { apiService } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {

  const { execute, loading, error } = useApi();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleBuilder = () => {
    if(isLoggedIn){
      router.push('/builder')
    }else{
      router.push('/login')
    }
  }

    useEffect(() => {
    const checkIfLoggedIn = async () => {
      const result = await execute(() => apiService.auth.isLoggedIn());
      
      if (result) {
       setIsLoggedIn(true)
      }
    }

    checkIfLoggedIn();
  }, [])


  return (
    <section className="lg:flex lg:h-[825px] lg:justify-center lg:items-center">
      <div className="mx-auto max-w-xl pt-8 text-center lg:mx-0 lg:grow lg:pt-32 lg:text-left">
        <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
          Create a professional
          <br />
          resume easily
        </h1>
        <p className="mt-3 text-lg lg:mt-5 lg:text-xl">
          With this free, open-source, and powerful resume builder
        </p>
        <p className="h-20">

        </p>
        <div onClick={handleBuilder} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full w-44 cursor-pointer">
          Create Resume <span aria-hidden="true">→</span>
        </div>
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
