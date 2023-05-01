const Button = (props: any) => {
  return (
    <button
      className={props.className}
      type={props.type}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      id={props.id}
    >
      {props.btnText}
    </button>
  );
};

export default Button;
