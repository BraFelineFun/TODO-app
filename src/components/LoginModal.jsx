import React, {useState} from 'react';
import MyInputText from "./UI/input/MyInput_text";
import MyButton from "./UI/button/MyButton";
import Modal from "./UI/modal/modal";
import Data from "../UserData"

const LoginModal = ({user, setIsLoginModal}) => {

    const [isSign, setIsSign] = useState(false);
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [sndPass, setsndPass] = useState("");
    const [correctPass, setCorrectPass] = useState(false);

    const regexPass =/^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/g;

    function checkValues(){
        console.log({login, pass, sndPass});
        if(isSign){
            if (pass!==sndPass) alert("")
        }
    }
    function validatePass(pass){
        if (regexPass.test(pass))
            setCorrectPass(true);
        else setCorrectPass(false);
    }

    return (
        <Modal setModal={setIsLoginModal}>
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
                <MyInputText value={login}
                             onChange={(e) => setLogin(e.target.value)}
                             id="login" type="text" required/>
            </div>
            <div className="login_input">
                <label htmlFor="password">Enter password:</label>
                <MyInputText  value={pass}
                    onChange={(e) => {
                        setPass(e.target.value);
                        validatePass(e.target.value);
                    }}
                    id="password" type="password" required/>
            </div>
            {isSign &&
                [<div className="login_validatePass">
                    <div className="login_validateImg">
                        {correctPass?
                            <img src="https://cdn-icons.flaticon.com/png/512/4436/premium/4436481.png?token=exp=1657443137~hmac=2dbf7bd6cb681f8d13192d2c45a67b0e" alt=""/>:
                            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt=""/>
                        }
                    </div>
                    <div className="login_passDescription">
                        <p><b>Password</b> must contain at least:</p>
                        <hr/>
                        <ul>
                            <li>8 characters length</li>
                            <li>2 letters in Upper Case</li>
                            <li>2 numerals (0-9)</li>
                            <li>3 letters in Lower Case</li>
                        </ul>
                    </div>
                </div>,


                <div className="login_input">
                    <label htmlFor="password">Enter password again:</label>
                    <MyInputText value={sndPass}
                                 onChange={(e) => setsndPass(e.target.value)}
                                 id="password" type="password" required/>
                </div>]
            }

            <MyButton onClick={checkValues}>{!isSign? "Log In": "Sign In"}</MyButton>
        </Modal>
    );
};

export default LoginModal;