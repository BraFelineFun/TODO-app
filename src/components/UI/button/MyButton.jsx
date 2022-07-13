import React from 'react';
import classes from "./MyButton.module.css";

const MyButton = React.memo(({children, ...props}) => {
    return (
        <button {...props} className={classes.myBut} type="text">
            {children}
        </button>
    );
});

export default MyButton;