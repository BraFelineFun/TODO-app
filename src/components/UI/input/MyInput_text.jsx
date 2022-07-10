import React, {forwardRef} from 'react';
import classes from './MyInputText.module.css'
const MyInputText = forwardRef((props,ref) => {
    return (
        <input {...props} ref={ref} className={classes.myInpText}/>
    );
});

export default MyInputText;