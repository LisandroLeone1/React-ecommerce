const Input = ({
    labelName,
    labelValue,
    opcional = false,
    name,
    type = "text", // Por defecto es texto
    value,
    onChange,
    required = false,
    pattern,
    title,
    error,
    options = [],
    renderOptions, // opciones para un select
    ...rest
  }) => {
    // si el type es "textarea", renderiza un <textarea> en lugar de <input>
    if (type === "textarea") {
      return (
        <div className="flex flex-col gap-2">
          {labelName && (
            <label htmlFor={labelValue} className="text-[14px] text-gray-500">
              {labelName}
              {opcional && (<span className="text-[11px]"> (opcional)</span>)}
            </label>
          )}
          <textarea
            id={labelValue}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            pattern={pattern}
            title={title}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto"
            {...rest}
          />
          {error && <span className="text-red-500 text-[13px]">{error}</span>}
        </div>
      );
    }
  
    // si el type es "select", renderiza un <select> con las opciones pasadas
    if (type === "select") {
    return (
      <div className="flex flex-col gap-2">
        {labelName && (
          <label htmlFor={labelValue} className="text-[13px] text-gray-500">
            {labelName}
          </label>
        )}
        <select
          id={labelValue}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto"
          {...rest}
        >
          {renderOptions
            ? renderOptions()
            : options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
        </select>
        {error && <span className="text-red-500 text-[13px]">{error}</span>}
      </div>
    );
  }
  
    // si no es ninguno de los anteriores, se renderiza el input por defecto
    return (
      <div className="flex flex-col gap-2">
        {labelName && (
          <label htmlFor={labelValue} className="text-[14px] text-gray-500">
            {labelName}
            {opcional && (<span className="text-[11px]"> (opcional)</span>)}
          </label>
        )}
        <input
          id={labelValue}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          pattern={pattern}
          title={title}
          className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cuarto"
          {...rest}
        />
        {error && <span className="text-red-500 text-[13px]">{error}</span>}
      </div>
    );
  };
  
  export default Input;

