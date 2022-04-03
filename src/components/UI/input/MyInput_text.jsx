import React from 'react';
import classes from './MyInputText.module.css'
const MyInputText = (props) => {
    return (
        <input{...props} className={classes.myInpText} type="text"/>
    );
};

export default MyInputText;