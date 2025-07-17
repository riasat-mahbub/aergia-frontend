import Link from "next/link";


export default function Home() {
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
        <Link href="/resume-import" className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full">
          Create Resume <span aria-hidden="true">→</span>
        </Link>
        <p className="ml-3 mt-3 text-sm text-gray-600">No sign up required</p>
        <p className="mt-3 text-sm text-gray-600 lg:mt-36">
          Already have a resume? Test its ATS readability with the{" "}
          <Link href="/resume-parser" className="underline underline-offset-2">
            resume parser
          </Link>
        </p>
      </div>

    </section>
  );
};
