import React from 'react';
import classes from './modal.module.css'
const Modal = ({children, isModal, closeModal, ...props}) => {
    return (
         <div
            style={{display: isModal === true ? "flex" :"none"}}
            className={classes.modal__wrapper}
            onClick={closeModal}
         >
             <div
                 {...props}
                 className={classes.modal}
                 onClick={(e) => e.stopPropagation()}
             >
                 <div className={classes.modal__img}>
                     <img
                         src="https://cdn.onlinewebfonts.com/svg/download_32988.png"
                         alt="close"
                         onClick={closeModal}
                     />
                 </div>
                 {children}
             </div>

        </div>
    );
};

export default Modal;