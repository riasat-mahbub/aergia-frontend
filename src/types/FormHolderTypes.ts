import { ResumeForm } from "./ResumeFormTypes";

export interface FormHolder{
    id: string;
    title: string;
    icon: string;
    type: string;
    data: ResumeForm[];
    visible: boolean;
}