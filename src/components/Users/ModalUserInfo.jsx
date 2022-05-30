const ModalInfo = ({ handleCloseInfo, showInfo, children }) => {
    const showHideClassName = showInfo ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <button type="button" onClick={handleCloseInfo}
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
  export default ModalInfo;