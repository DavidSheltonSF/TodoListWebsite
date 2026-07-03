import { ButtonHTMLAttributes } from "react";

export function Button({className, ...buttonProps}: ButtonHTMLAttributes<HTMLButtonElement>){
  const baseStyles = "rounded-md px-[16px] py-[8px] cursor-pointer hover:brightness-110"
  const transitionStyles = "transition-[filter] duration-300"

  return <button className={`${baseStyles} ${transitionStyles} ${className}`}
  {...buttonProps}
  ></button>
}