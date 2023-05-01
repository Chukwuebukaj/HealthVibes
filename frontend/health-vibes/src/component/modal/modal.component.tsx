import "./modal.css";

interface MyProps {
  closeBtnClassName: string | undefined;
  secondContentClassName: string | undefined;
  contentClassName: string | undefined;
  parentclassName: string | undefined;
  onClick: () => void;
  modalContent: any;
}

const Modal = (props: MyProps) => {
  return (
    <div className={props.parentclassName}>
      <div className={props.contentClassName}>
        <span className={props.closeBtnClassName} onClick={props.onClick}>
          &times;
        </span>
        <div className={props.secondContentClassName}>
          {props.modalContent}
          {/* <button onClick={props.onBtnClick}>{props.btn2Txt}</button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
