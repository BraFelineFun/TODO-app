import React from 'react';
import classes from './Validation.module.css'

const Validation = React.memo(({correct, title, children, ...props}) => {
    const [titleMain, ...titleRest] = title.split(" ");
    return (
        <div className={classes.validatePass} {...props}>
            <div className={classes.validateImg}>
                {correct?
                    <img src="https://cdn-icons.flaticon.com/png/512/4436/premium/4436481.png?token=exp=1657443137~hmac=2dbf7bd6cb681f8d13192d2c45a67b0e" alt=""/>:
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt=""/>
                }
                <p><b>{titleMain}</b> {titleRest.join(" ")}</p>
            </div>
            <div className={classes.passDescription}>
                <hr/>
                {children}
            </div>
        </div>
    );
});

export default (Validation);