import Link from "next/link";
import Dropzone from "@/components/Dropzone";

export default function Importer(){
    return(
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm mt-10">
                <div className="w-full">
                    <Dropzone />
                </div>

                <div className="flex items-center w-full my-4">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm font-medium">or</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                <div className="flex flex-col text-center gap-4">
                    <p className="mb-2">Don't have a resume?</p>
                    <Link href={"creator"} className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors">Create new</Link>
                </div>
            </div>
        </div>
    )
}
