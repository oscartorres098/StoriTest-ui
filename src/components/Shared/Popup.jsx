import ReactModal from 'react-modal';
import "./Popup.css"

function Popup(props) {

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // Cambia el color de fondo de react-modal
      position: 'fixed',
      top: `${props.isUpLessThirty ? '-30%':'0%'}`,
    },
    content: {
      borderRadius: 12,
    }
  };


  return (
    <ReactModal
      className={`react-modal ${props.modalClass}`}
      isOpen={props.isOpen}
      onRequestClose={props.onClose}
      ariaHideApp={false}
      style={customStyles}
    >
      {props.title && <h2>{props.title}</h2>}
      {props.children}
    </ReactModal>
  );
}


export { Popup };
