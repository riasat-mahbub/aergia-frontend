import { Plus } from "lucide-react";
import FormCollection from "./FormCollection";

export default function Builder(){
    return(
        <div className="flex lg:flex-row flex-col">
            <div className="lg:w-1/2 w-full flex flex-col justify-center items-center">
                <FormCollection/>
                <div className="rounded-full text-white bg-emerald-500 flex mt-6 max-w-40 p-4 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                    <Plus/>
                    Add Content
                </div>
                
            </div>

            <div>
                FormToPDf
            </div>

        </div>
    )
}