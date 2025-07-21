"use client"

import { useSelector } from "react-redux";
import FormHolderCard from "./components/FormHolderCard"
import { RootState } from "@/store/store";



export default function FormCollection(){
    
  // Get forms from Redux store
  const formHolders = useSelector((state: RootState) => state.forms.formHolders);

    return(
        <div className="lg:w-1/2 w-full">
            {formHolders.map((formHolder) => (
                <FormHolderCard key={formHolder.id} formHolder={formHolder}/>
            ))}
        </div>
    )
}