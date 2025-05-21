export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      className={`flex items-center ${
        outline ? "border border-caribbeangreen-600 bg-transparent text-caribbeangreen-600" : "bg-caribbeangreen-600 text-richblack-5"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold hover:opacity-80 transition-all ${customClasses}`}
      type={type}
    >
      {children ? (
        <>
          <span className={`${outline && "text-caribbeangreen-600"}`}>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
}
