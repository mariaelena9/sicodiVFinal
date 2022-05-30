const ModalUpdate = ({ handleCloseU, showU, children }) => {
    const showHideClassName = showU ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <button type="button" onClick={handleCloseU}
            style={{
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              alignSelf: "flex-end",
              width: "30px", 
              height: "30px"
            }}>
            X
          </button>
          {children}
        </section>
      </div>
    );
  };
  
  //Exportación del componente:
  export default ModalUpdate;