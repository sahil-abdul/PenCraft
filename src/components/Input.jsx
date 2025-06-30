import { useId } from "react";

function Input({ label, type = "text", className = "", ref, ...props }) {
  const Id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={Id}>
          {label}
        </label>
      )}
      <input
        type={type}
        ref={ref}
        {...props}
        id={Id}
        className={` px-3 py-2 rounded-lg bg-white text-black 
          outline-none focus:bg-[#f3d8c7] duration-200 
          border border-[#d0b8ac] w-full ${className}`}
      />
    </div>
  );
}
export default Input;
