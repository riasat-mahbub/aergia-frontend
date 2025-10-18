import { Svg, Path, Line, Circle, Polyline, Polygon, Rect } from "@react-pdf/renderer";
import * as LucideIcons from "lucide-static";

type LucideIconName = keyof typeof LucideIcons;

interface LucidePdfIconProps {
  name: string;
  size?: number;
  color?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  style?: Record<string, any> | Record<string, any>[];
}

export const LucidePdfIcon = ({name,size = 12,color = "black", style}: LucidePdfIconProps) => {
    const iconName = (name in LucideIcons ? name : "Mail") as LucideIconName;
    const iconSvgString = LucideIcons[iconName];

    if (!iconSvgString) {
        console.warn(`Lucide icon "${name}" not found`);
        return null;
    }

    const viewBoxMatch = iconSvgString.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 24 24";

    const paths = Array.from(iconSvgString.matchAll(/<path[^>]*d="([^"]+)"/g)).map(m => m[1]);

  
    const lines = Array.from(iconSvgString.matchAll(/<line[^>]*x1="([^"]+)"[^>]*y1="([^"]+)"[^>]*x2="([^"]+)"[^>]*y2="([^"]+)"/g))
    .map(m => ({ x1: parseFloat(m[1]), y1: parseFloat(m[2]), x2: parseFloat(m[3]), y2: parseFloat(m[4]) }));
  
    const circles = Array.from(iconSvgString.matchAll(/<circle[^>]*cx="([^"]+)"[^>]*cy="([^"]+)"[^>]*r="([^"]+)"/g))
    .map(m => ({ cx: parseFloat(m[1]), cy: parseFloat(m[2]), r: parseFloat(m[3]) }));
  
    const polylines = Array.from(iconSvgString.matchAll(/<polyline[^>]*points="([^"]+)"/g))
    .map(m => m[1]);
    
    const polygons = Array.from(iconSvgString.matchAll(/<polygon[^>]*points="([^"]+)"/g))
    .map(m => m[1]);
  
    const rects = Array.from(iconSvgString.matchAll(/<rect[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"/g))
    .map(m => ({
      x: parseFloat(m[1]),
      y: parseFloat(m[2]),
      width: parseFloat(m[3]),
      height: parseFloat(m[4]),
    }));

    return (
        <Svg
            width={size}
            height={size}
            viewBox={viewBox}
            stroke={color}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={style}
        >
            {paths.map((d, i) => <Path key={i} d={d} stroke={color} fill="none" />)}
            {lines.map((l, i) => <Line key={i} {...l} stroke={color} />)}
            {circles.map((c, i) => <Circle key={i} {...c} stroke={color} fill="none" />)}
            {polylines.map((points, i) => <Polyline key={i} points={points} stroke={color} fill="none" />)}
            {polygons.map((points, i) => <Polygon key={i} points={points} stroke={color} fill="none" />)}
            {rects.map((r, i) => <Rect key={i} {...r} stroke={color} fill="none" />)}
        </Svg>
    );
};
