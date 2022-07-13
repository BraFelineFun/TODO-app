import React, {useEffect} from 'react';
import classes from './modal.module.css'
import Motion from "react-motion/lib/Motion";
import {presets, spring} from "react-motion";
const Modal = ({children, setModal, EnterCallback, typeMessage=false, ...props}) => {


    function keyDownEvent (e){
        // console.log(e.code)
        if (e.code === "Enter" && EnterCallback !== undefined)
            EnterCallback();
        if (e.code === "Escape")
            setModal(false);
    }

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
                className={[classes.modal__wrapper, classes.modalStyle].join(' ')}
                onClick={() => setModal(false)}
            >
                {/*using Motion to animate modal appearance*/}
                <div
                    onKeyDown={keyDownEvent}
                    style={{
                        transform: `scale(${interpolatedStyles.scale})`,
                        opacity: interpolatedStyles.opacity
                    }}

                    {...props}
                    className={[classes.modal, classes.modalStyle].join(' ')}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={classes.modal__img}>
                        <img
                            className={[classes.img, classes.modalStyle].join(' ')}
                            src="https://cdn-icons-png.flaticon.com/512/1828/1828747.png"
                            alt="close"
                            onClick={() => setModal(false)}
                        />
                    </div>
                    {(typeMessage) &&
                        <div className={classes.modal__splitter}>
                            <hr/>
                        </div>
                    }
                    {children}
                </div>

            </div>
            )}
        </Motion>

    );
};

export default Modal;