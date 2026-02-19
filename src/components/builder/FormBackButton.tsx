import { RootState } from "@/store/store"
import { ChevronLeft } from "lucide-react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export default function FormBackButton(){
    
    const cvTitle = useSelector((state:RootState) => state.cv.selectedCvTitle)
    const navigate = useNavigate();

    return(
        <div className="flex flex-row justify-between w-[95%] mt-6 items-center border-b border-gray-300">
            <ChevronLeft
                className="text-4xl"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/cvs`);
                }}
            />
            <div className="font-bold text-3xl">{cvTitle}</div>
            <div>CV</div>
        </div>
    )
}