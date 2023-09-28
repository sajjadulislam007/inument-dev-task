const Input = ({ type, title, value, name, pattern, placeholder, icon, isValidateBool, action }) => {
  return (
    <div className="form-group">
      <label className={!isValidateBool ? "error" : ""} htmlFor="email">
        {title}
      </label>
      <span className="icon">{icon}</span>
      <input
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        pattern={pattern ? pattern : null}
        required
        className="form-control"
        onChange={action}
      />
    </div>
  );
};
export default Input;
