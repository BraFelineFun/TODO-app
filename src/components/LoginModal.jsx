import React, { useState} from 'react';
import MyInputText from "./UI/input/MyInput_text";
import MyButton from "./UI/button/MyButton";
import Modal from "./UI/modal/modal";
import {UserData} from "../UserData"

const LoginModal = ({setUser, user, setIsLoginModal}) => {

    const [isSign, setIsSign] = useState(false);

    const [enteredData, setEnteredData] = useState({
        login:"", pass:"", sndPass:""
    })
    const [correctPass, setCorrectPass] = useState(false);
    const [isPasswordFocus, setIsPasswordFocus] = useState(false);

    const regexPass =/^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/g;

    function checkValues(){
        if(isSign){
            if (enteredData.pass!== enteredData.sndPass) alert("Passwords must be the same");
            else if (!correctPass)
                alert("!")
                // <Modal>Password must meet the requirements</Modal>
            else if (enteredData.login === "")
                alert("Please, enter your name");
            else {
                setUser({...user, loggedIn: true, name:enteredData.login})
                setIsLoginModal(false);
            }
        }
        else{
            let foundUser = {}
            UserData.forEach((user) =>{
                if (user.name === enteredData.login)
                    foundUser = user;
            })
            if (foundUser.pass === enteredData.pass)
            {
                setUser({loggedIn: true, name: foundUser.name, image: foundUser.image})
                setIsLoginModal(false);
            }
        }
    }
    function validatePass(pass){
        if (regexPass.test(pass))
            setCorrectPass(true);
        else setCorrectPass(false);
    }

    return (
        <Modal EnterCallback={checkValues} setModal={setIsLoginModal}>
            <div className="login_userImg">
                <div className="login_imageBox">
                    <img src={user.image} alt="user"/>
                </div>
            </div>
            <div className="login_choiseBox">
                <div className={!isSign? "login_choise activeChoiseLabel": "login_choise"}
                     onClick={() => setIsSign(false)}
                >LOG IN</div>

                <span></span>

                <div className={isSign? "login_choise activeChoiseLabel": "login_choise"}
                     onClick={() => setIsSign(true)}
                >SIGN IN</div>
            </div>

            <div className="login_input">
                <label htmlFor="login">Enter login:</label>
                <MyInputText value={enteredData.login}
                             onChange={(e) => setEnteredData({...enteredData, login: e.target.value})}
                             id="login" type="text" required/>
            </div>
            <div className="login_input">
                <label htmlFor="password">Enter password:</label>
                <MyInputText onFocus={() => setIsPasswordFocus(true)}
                        value={enteredData.pass}
                        onChange={(e) => {
                            setEnteredData({...enteredData, pass: e.target.value})
                            validatePass(e.target.value);
                        }}
                        id="password" type="password" required/>
            </div>
            {isSign &&

                /*---Validation View---*/
                [isPasswordFocus&& <div className="login_validatePass">
                    <div className="login_validateImg">
                        {correctPass?
                            <img src="https://cdn-icons.flaticon.com/png/512/4436/premium/4436481.png?token=exp=1657443137~hmac=2dbf7bd6cb681f8d13192d2c45a67b0e" alt=""/>:
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt=""/>
                        }
                        <p><b>Password</b> must contain at least:</p>
                    </div>

                    <div className="login_passDescription">

                        <hr/>
                        <ul>
                            <li>8 characters length</li>
                            <li>2 letters in Upper Case</li>
                            <li>2 numerals (0-9)</li>
                            <li>3 letters in Lower Case</li>
                        </ul>
                    </div>
                </div>,
                /*----------------------*/

                <div className="login_input">
                    <label htmlFor="password">Enter password again:</label>
                    <MyInputText value={enteredData.sndPass}
                                 onChange={(e) => setEnteredData({...enteredData, sndPass: e.target.value})}
                                 id="password" type="password" required/>
                </div>]
            }

            <MyButton onClick={checkValues}>{!isSign? "Log In": "Sign In"}</MyButton>
        </Modal>
    );
};

export default LoginModal;