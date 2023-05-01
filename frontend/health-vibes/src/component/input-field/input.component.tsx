const InputField = (props: any) => {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={props.className}
      id={props.id}
      required
    />
  );
};

export default InputField;
