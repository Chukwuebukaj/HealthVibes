import "./modal.css";

interface MyProps {
  onBtnClick: () => void;
  btn2Txt: string;
  onClick: () => void;
}

const Modal2 = (props: MyProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={props.onClick}>
          &times;
        </span>
        <div className="modal-btn">
          <button onClick={props.onBtnClick}>{props.btn2Txt}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
