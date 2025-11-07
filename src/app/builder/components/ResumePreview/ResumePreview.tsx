import SafeHTML from "@/components/SafeHTML";
import { ResumeForm } from "@/types/ResumeFormTypes";
import React from "react";

/* --------------------------
   Types
   -------------------------- */
export type NodeType = "Div" | "Text" | "Icon" | "Link" | "Html" | "map" | string;

export interface BaseNode {
  type: NodeType;
  style?: string;      // e.g. ".name" or "name"
  bind?: string;       // e.g. "data.name" or "info.icon"
  textbind?: string;   // e.g. "url.title"
  visible?: boolean;
}

export interface ElementNode extends BaseNode {
  children?: StructureNode[];
}

export interface MapNode extends BaseNode {
  type: "map";
  source: string;            // e.g. "data.infos" or "infos"
  bind?: string;             // optional local name for items (e.g. "info")
  template: StructureNode;
}

export type StructureNode = ElementNode | MapNode;


/* --------------------------
   Helpers: path resolving
   -------------------------- */
function getPath(obj: unknown, path: string): unknown {
  if (obj == null || !path) return undefined;
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    // numeric index support
    const idx = Number.isInteger(Number(p)) ? Number(p) : p;
    cur = (cur as Record<string | number, unknown>)[idx];
  }
  return cur;
}

/**
 * resolveBind:
 * - if bind starts with "data." -> resolve from formData (strip "data.")
 * - else if first segment exists in locals -> resolve from locals[firstSegment].rest
 * - else try resolving from formData directly (allow both "name" and "data.name")
 */
function resolveBind(bind: string | undefined, formData: unknown, locals: unknown = {}): unknown {
  if (!bind) return undefined;
  const trimmed = bind.trim();
  if (trimmed.startsWith("data.")) {
    return getPath(formData, trimmed.slice("data.".length));
  }
  // attempt local resolution (e.g., "info.icon")
  const firstDot = trimmed.indexOf(".");
  if (firstDot === -1) {
    if (typeof locals === 'object' && locals !== null && !Array.isArray(locals) && trimmed in locals) {
      return (locals as Record<string, unknown>)[trimmed];
    }
    return getPath(formData, trimmed);
  } else {
    const first = trimmed.slice(0, firstDot);
    const rest = trimmed.slice(firstDot + 1);
    if (typeof locals === 'object' && locals !== null && !Array.isArray(locals) && first in locals) {
      return getPath((locals as Record<string, unknown>)[first], rest);
    }
    // fallback to formData.first.rest
    return getPath(formData, `${first}.${rest}`);
  }
}

/* --------------------------
   Utility: normalize class name
   -------------------------- */
const classNameFromStyle = (style?: string) => {
  if (!style) return undefined;
  const s = style.trim();
  return s.startsWith(".") ? s.slice(1) : s;
};

/* --------------------------
   Main renderer component
   -------------------------- */
interface CustomComponentProps {
  value?: unknown;
  node?: StructureNode;
  formData?: unknown;
  locals?: unknown;
  className?: string;
}

export interface ResumePreviewProps {
  structure: ElementNode;
  formData: ResumeForm;
  components?: Record<string, React.ComponentType<CustomComponentProps> | ((props: CustomComponentProps) => React.ReactNode)>;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ structure, formData, components = {} }) => {
  // Recursive renderer
  function renderNode(node: StructureNode | undefined, locals: unknown = {}): React.ReactNode {
    if (!node) return null;
    if (formData.visible === false) return null;

    const nodeType = node.type || "Div";
    const cls = classNameFromStyle(node.style);

    switch (nodeType) {
      case "map": {
        const mapNode = node as MapNode;
        // resolve source relative to formData
        const sourcePath = mapNode.source?.startsWith("data.") ? mapNode.source : mapNode.source;
        const arr = resolveBind(sourcePath, formData, locals) || [];
        if (!Array.isArray(arr)) return null;
        const itemName = mapNode.bind || "item"; // use provided local name or default
        return (
          <React.Fragment>
            {arr.map((it: unknown, idx: number) => {
              const localsObj = typeof locals === 'object' && locals !== null && !Array.isArray(locals) ? locals as Record<string, unknown> : {};
              const newLocals = { ...localsObj, [itemName]: it };
              const tpl = mapNode.template;
              // if template is a root element and has a style meaning class to apply, it will be used inside renderNode
              return <React.Fragment key={idx}>{renderNode(tpl as StructureNode, newLocals)}</React.Fragment>;
            })}
          </React.Fragment>
        );
      }

      case "Div": {
        const el = node as ElementNode;
        const children = Array.isArray(el.children) 
          ? el.children.map((c, i) => renderNode(c, locals)).filter(Boolean)
          : [];
        
        if (children.length === 0) return null; // Skip empty divs
        
        return (
          <div className={cls} key={Math.random()}>
            {children.map((child, i) => <React.Fragment key={i}>{child}</React.Fragment>)}
          </div>
        );
      }

      case "Text": {
        const val = resolveBind(node.bind, formData, locals);
        if(!val) return null;
        return <p className={cls}>{String(val ?? "")}</p>;
      }

      case "Raw": {
        return <span className={cls}>{node.bind ?? ""}</span>;
      }

      case "Html": {
        const html = resolveBind(node.bind, formData, locals) ?? "";
        if (!String(html).trim()) return null; // Skip empty
        return <div className={cls} dangerouslySetInnerHTML={{ __html: SafeHTML(String(html)) }} />;
      }

      case "Icon": {
        const iconVal = resolveBind(node.bind, formData, locals);
        if (!iconVal) return null; // Skip empty
        const Custom = components["Icon"];
        if (Custom) return <Custom value={iconVal} className={cls} />;
        return <span className={cls}>{String(iconVal)}</span>;
      }

      case "Link": {
        const href = String(resolveBind(node.bind, formData, locals) ?? "#");
        if (!href || href === "#") return null; // Skip empty links
        const text = node.textbind ? resolveBind(node.textbind, formData, locals) : href;
        return (
          <a className={cls} href={href}>
            {String(text ?? href)}
          </a>
        );
      }

      default: {
        // custom component support
        const Custom = components[nodeType];
        if (Custom) {
          const value = resolveBind(node.bind, formData, locals);
          return <Custom value={value} node={node} formData={formData} locals={locals} className={cls} />;
        }

        // fallback: if children exist render them in a div, otherwise render bound value
        const el = node as ElementNode;
        if (el.children && el.children.length) {
          return (
            <div className={cls}>
              {el.children.map((c, i) => (
                <React.Fragment key={i}>{renderNode(c, locals)}</React.Fragment>
              ))}
            </div>
          );
        }
        const value = resolveBind(node.bind, formData, locals);
        return <span className={cls}>{value != null ? String(value) : null}</span>;
      }
    }
  }

  return <>{renderNode(structure, {})}</>;
};

export default ResumePreview;
