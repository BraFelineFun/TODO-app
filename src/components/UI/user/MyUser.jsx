import React from 'react';
import cl from "./MyUser.module.css"

const MyUser = ({userName}) => {
    return (
        <div className={cl.user}>
            <div className={cl.user__greeting}>
                <p>Hello, {userName}</p>
            </div>
            <div className={cl.user__userImg}>
                <img src="https://img.icons8.com/ios-glyphs/344/user--v1.png"
                     alt="userImg"/>
            </div>
        </div>
    );
};

export default MyUser;