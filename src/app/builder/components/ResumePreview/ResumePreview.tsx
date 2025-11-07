import SafeHTML from "@/components/SafeHTML";
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
function getPath(obj: any, path: string): any {
  if (obj == null || !path) return undefined;
  const parts = path.split(".");
  let cur: any = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    // numeric index support
    const idx = Number.isInteger(Number(p)) ? Number(p) : p;
    cur = cur[idx];
  }
  return cur;
}

/**
 * resolveBind:
 * - if bind starts with "data." -> resolve from formData (strip "data.")
 * - else if first segment exists in locals -> resolve from locals[firstSegment].rest
 * - else try resolving from formData directly (allow both "name" and "data.name")
 */
function resolveBind(bind: string | undefined, formData: any, locals: Record<string, any> = {}) {
  if (!bind) return undefined;
  const trimmed = bind.trim();
  if (trimmed.startsWith("data.")) {
    return getPath(formData, trimmed.slice("data.".length));
  }
  // attempt local resolution (e.g., "info.icon")
  const firstDot = trimmed.indexOf(".");
  if (firstDot === -1) {
    if (locals.hasOwnProperty(trimmed)) return locals[trimmed];
    return getPath(formData, trimmed);
  } else {
    const first = trimmed.slice(0, firstDot);
    const rest = trimmed.slice(firstDot + 1);
    if (locals.hasOwnProperty(first)) {
      return getPath(locals[first], rest);
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
export interface ResumePreviewProps {
  structure: ElementNode;
  formData: any; // data object (accessible via "data.*")
  // optional map of custom renderers (e.g. { Icon: MyIconComponent })
  components?: Record<string, React.ComponentType<any> | ((props: any) => React.ReactNode)>;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ structure, formData, components = {} }) => {
  // Recursive renderer
  function renderNode(node: StructureNode | undefined, locals: Record<string, any> = {}): React.ReactNode {
    if (!node) return null;
    if ((node as any).visible === false) return null;

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
            {arr.map((it: any, idx: number) => {
              const newLocals = { ...locals, [itemName]: it };
              const tpl = mapNode.template;
              // if template is a root element and has a style meaning class to apply, it will be used inside renderNode
              return <React.Fragment key={idx}>{renderNode(tpl as StructureNode, newLocals)}</React.Fragment>;
            })}
          </React.Fragment>
        );
      }

      case "Div": {
        const el = node as ElementNode;
        return (
          <div className={cls} key={Math.random()}>
            {Array.isArray(el.children) ? el.children.map((c, i) => <React.Fragment key={i}>{renderNode(c, locals)}</React.Fragment>) : null}
          </div>
        );
      }

      case "Text": {
        const val = resolveBind(node.bind, formData, locals);
        return <p className={cls}>{val ?? ""}</p>;
      }

      case "Raw": {
        return <span className={cls}>{node.bind ?? ""}</span>;
      }

      case "Html": {
        const html = resolveBind(node.bind, formData, locals) ?? "";
        return <div className={cls} dangerouslySetInnerHTML={{ __html: SafeHTML(String(html)) }} />;
      }

      case "Icon": {
        const iconVal = resolveBind(node.bind, formData, locals);
        const Custom = components["Icon"];
        if (Custom) return <Custom value={iconVal} className={cls} />;
        return <span className={cls}>{iconVal ?? "🔹"}</span>;
      }

      case "Link": {
        const href = resolveBind(node.bind, formData, locals) ?? "#";
        const text = node.textbind ? resolveBind(node.textbind, formData, locals) : resolveBind(node.bind, formData, locals);
        return (
          <a className={cls} href={href}>
            {text ?? href}
          </a>
        );
      }

      default: {
        // custom component support
        const Custom = components[nodeType];
        if (Custom) {
          const El = Custom as any;
          const value = resolveBind(node.bind, formData, locals);
          return <El value={value} node={node} formData={formData} locals={locals} className={cls} />;
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
        return <span className={cls}>{value ?? null}</span>;
      }
    }
  }

  return <>{renderNode(structure, {})}</>;
};

export default ResumePreview;
