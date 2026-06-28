import { PropsWithChildren, SVGProps } from "react";

type IconProps  ={
  className?: string,
} & PropsWithChildren & SVGProps<SVGSVGElement>

export function Icon({className = "size-[24px]", children, ...svgProps}: IconProps) {
  return  <svg className={className} xmlns="http://www.w3.org/2000/svg" {...svgProps }>
      {children}
  </svg>;
}