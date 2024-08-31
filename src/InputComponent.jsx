const InputComponent = ({ type, id, value, name, onChange, onKeyDown, required, placeholder, onBlur, ...props }) => {
  return (
    <input
      type={type}
      id={id}
      className="w-full p-2 border border-gray-300 rounded-md"
      value={value}
      name={name}
      onChange={onChange}
      onKeyDown={onKeyDown}
      required={required}
      placeholder={placeholder}
      onBlur={onBlur}
      {...props}
    />
  );
};

export default InputComponent;
