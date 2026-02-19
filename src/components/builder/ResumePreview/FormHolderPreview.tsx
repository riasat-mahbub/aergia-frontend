import { FormHolder } from "@/types/FormHolderTypes";
import { TemplateRenderer } from "@/utils/templateRenderer";
import { getMITTemplate } from "@/templates/MIT";

interface FormHolderPreviewProps {
  formHolder: FormHolder;
  themeColor: string;
}

export default function FormHolderPreview({
  formHolder,
  themeColor,
}: FormHolderPreviewProps) {
  const { type, title, data, id } = formHolder;

  const template = getMITTemplate(type);
  const isProfile = type === "profile";

  return (
    <div className={`th-${id}`}>
      {!isProfile && (
        <p className="sectionTitle">{title}</p>
      )}
      {TemplateRenderer.renderStructure(template, data)}
    </div>
  );
}
