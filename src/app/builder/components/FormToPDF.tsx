"use client";
import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import Spinner from "@/components/Spinner";

import { useFormHolders } from "@/hooks/useFormHolders";

export default function FormToPDF() {
  const {loading} = useFormHolders()
  
  const formHolders = useSelector(
    (state: RootState) =>
      state.forms.formHolders.filter((holder) => holder.visible !== false),
    shallowEqual
  );


  if ( loading) {
    return <Spinner />;
  }

  return (
    <div style={{ width: "100%", height: "100vh"}} className="bg-white p-4">
      {formHolders.map((formHolder) => (
        <FormHolderPreview
          key={formHolder.id}
          formHolder={formHolder}
        />
        ))
      }
    </div>
  );
}