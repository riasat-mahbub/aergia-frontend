import { FormHolder } from "@/types/FormHolderTypes";
import { TemplateRenderer } from "@/utils/templateRenderer";
import { getMITTemplate } from "@/templates/MIT";
import { getDefaultDateFormat } from "@/utils/dateUtils";

interface FormHolderPreviewProps {
  formHolder: FormHolder;
  themeColor: string;
}

export default function FormHolderPreview({
  formHolder,
}: FormHolderPreviewProps) {
  const { type, title, data, id, dateFormat } = formHolder;

  const template = getMITTemplate(type);
  const isProfile = type === "profile";

  return (
    <div className={`th-${id}`}>
      {!isProfile && (
        <p className="sectionTitle">{title}</p>
      )}
      {TemplateRenderer.renderStructure(template, data, dateFormat || getDefaultDateFormat())}
    </div>
  );
}
