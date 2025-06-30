function Button({
  children,
  type = "button",
  bgColor = "#d0b8ac",
  textColor = "text-black",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-[#efe5dc] border ${bgColor} ${textColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
