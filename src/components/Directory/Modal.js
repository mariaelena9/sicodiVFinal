const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button type="button" onClick={handleClose}
          style={{
            display: "flex", justifyContent: "center", alignItems: "center", width: "25px", height: "25px", borderRadius: "100%"
          }}>
          X
        </button>
        {children}
        <div className='modalButton'>
          <button type="button">
            Escribir
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;