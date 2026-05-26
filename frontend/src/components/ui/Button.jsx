function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
}) {

  const variants = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white',

    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-800',

    danger:
      'bg-red-500 hover:bg-red-600 text-white',

    success:
      'bg-green-500 hover:bg-green-600 text-white',

    warning:
      'bg-yellow-400 hover:bg-yellow-500 text-black',

    outline:
      'border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-4
        py-2
        rounded-xl
        font-medium
        transition-all
        duration-200
        shadow-sm
        hover:shadow-md
        active:scale-95
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;