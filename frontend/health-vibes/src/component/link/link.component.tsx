const Link = (props: any) => {
  return (
    <a href={props.href} className={props.className} onClick={props.onClick} id={props.id}>
      {props.linkText}
    </a>
  );
};

export default Link;
