import React from 'react'
import Auxiliar from '../../../hoc/Auxiliar'
import Backdrop from '../Backdrop/Backdrop'
import './Modal.css'
const Modal = props => {
    return (
        <Auxiliar>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div className={`Modal ${props.show ? "ModalShow" : "ModalHide"}`}>
                {props.children}
            </div>
        </Auxiliar>

    )
}

export default React.memo(Modal, (prevProps, nextProps) => nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children);
