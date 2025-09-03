"use client";


import { useState } from "react";
import FormToPDF from "./components/FormToPDF";
import LeftSide from "./LeftSide";

export default function Builder(){
    
    return(
        <div className="flex lg:flex-row flex-col">

            <LeftSide/>
            <div className="lg:w-7/12 w-full flex flex-col items-center p-6">
                <FormToPDF />
            </div>

        </div>
    )
}