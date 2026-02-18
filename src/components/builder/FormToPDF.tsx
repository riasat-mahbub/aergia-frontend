import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Spinner from "@/components/Spinner";
import { DEFAULT_THEME_COLOR } from "@/store/settingSlice";

import { useFormHolders } from "@/hooks/useFormHolders";

export default function FormToPDF() {
  const {loading} = useFormHolders()
  
  const formHolders = useSelector(
    (state: RootState) =>
      state.forms.formHolders.filter((holder) => holder.visible !== false),
    shallowEqual
  );

  const themeColor = useSelector((state: RootState) => state.settings.themeColor) || DEFAULT_THEME_COLOR;

  if ( loading) {
    return <Spinner />;
  }

  return (
    <div style={{ width: "100%", height: "100vh"}} className="bg-white p-4">
      {formHolders.map((formHolder) => (
        <FormHolderPreview
          key={formHolder.id}
          formHolder={formHolder}
          themeColor={themeColor}
        />
        ))
      }
    </div>
  );
}
