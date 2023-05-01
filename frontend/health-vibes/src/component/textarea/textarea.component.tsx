const TextArea = (props: any) => {
  return (
    <textarea
      name={props.name}
      id={props.id}
      cols={props.cols}
      rows={props.rows}
      className={props.className}
      onChange={props.onChange}
      value={props.value}
    ></textarea>
  );
};

export default TextArea;
