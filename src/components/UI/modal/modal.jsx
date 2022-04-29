import React from 'react';
import classes from './modal.module.css'
import Motion from "react-motion/lib/Motion";
import {presets, spring} from "react-motion";
const Modal = ({children, isModal, closeModal, ...props}) => {
    return (
        <Motion
            defaultStyle={{
                opacity: 0,
                scale: 0
            }}
            style={{
                opacity: spring(1),
                scale: spring(1, presets.gentle)
            }}
        >
            {interpolatedStyles => (
            <div
                className={classes.modal__wrapper}
                onClick={closeModal}
            >
                {/*using Motion to animate modal appearance*/}
                <div
                    style={{
                        transform: `scale(${interpolatedStyles.scale})`,
                        opacity: interpolatedStyles.opacity
                    }}

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
            )}
        </Motion>

    );
};

export default Modal;