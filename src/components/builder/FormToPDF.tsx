import FormHolderPreview from "./ResumePreview/FormHolderPreview";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Spinner from "@/components/Spinner";
import { DEFAULT_THEME_COLOR } from "@/store/settingSlice";
import { useFormHolders } from "@/hooks/useFormHolders";
import { useEffect } from "react";
import "@/templates/MIT/styles/mit-template.css";

export default function FormToPDF() {
  const {loading} = useFormHolders()
  
  const formHolders = useSelector(
    (state: RootState) =>
      state.forms.formHolders.filter((holder) => holder.visible !== false),
    shallowEqual
  );

  const themeColor = useSelector((state: RootState) => state.settings.themeColor) || DEFAULT_THEME_COLOR;

  useEffect(() => {
    const styleId = 'formholder-custom-styles';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    let css = '';
    formHolders.forEach(holder => {
      if (holder.style) {
        const styles = holder.style as Record<string, Record<string, string | number>>;
        Object.entries(styles).forEach(([selector, rules]) => {
          css += `${selector} {\n`;
          Object.entries(rules).forEach(([prop, value]) => {
            css += `  ${prop}: ${value};\n`;
          });
          css += `}\n`;
        });
      }
    });

    styleElement.textContent = css;

    return () => {
      styleElement?.remove();
    };
  }, [formHolders]);

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
