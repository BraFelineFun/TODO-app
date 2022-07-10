import React from 'react';
import cl from "./MyUser.module.css"

const MyUser = ({user, setIsLoginModal}) => {

    return (
        <div className={cl.user} onClick={() => setIsLoginModal(true)}>
            <div className={cl.user__greeting}>
                <p>Hello, {user.name}</p>
            </div>
            <div className={cl.user__userImg}>
                <img src={user.image}
                     alt="userImg"/>
            </div>
        </div>
    );
};

export default MyUser;