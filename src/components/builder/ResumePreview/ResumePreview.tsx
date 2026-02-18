import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { forwardRef } from "react";
import FormHolderPreview from "./FormHolderPreview";
import Spinner from "@/components/Spinner";
import { useFormHolders } from "@/hooks/useFormHolders";

interface ResumePreviewProps {
  className?: string;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ className = "" }, ref) => {
    const { loading } = useFormHolders();

    const formHolders = useSelector(
      (state: RootState) =>
        state.forms.formHolders.filter((holder) => holder.visible !== false),
      shallowEqual
    );

    const settings = useSelector((state: RootState) => state.settings);

    if (loading) {
      return <Spinner />;
    }

    return (
      <div
        ref={ref}
        className={`bg-white shadow-lg ${className}`}
        style={{
          fontFamily: settings.fontFamily,
          fontSize: `${settings.fontSize}px`,
          color: "#171717",
        }}
      >
        <div className="p-8 min-h-[11in] w-[8.5in] mx-auto">
          {formHolders.map((formHolder) => (
            <FormHolderPreview
              key={formHolder.id}
              formHolder={formHolder}
              themeColor={settings.themeColor}
            />
          ))}
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
