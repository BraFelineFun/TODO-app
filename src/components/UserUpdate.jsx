import React, {useState} from 'react';
import Modal from "./UI/modal/modal";
import MyInputText from "./UI/input/MyInput_text";
import MyButton from "./UI/button/MyButton";
import {DefaultUser} from "../UserData";

const UserUpdate = ({setUser, user, setIsUpdateModal}) => {

    const [enteredData, setEnteredData] = useState({image: "", name: ""});
    const [changeLogin, setLoginChange] = useState(false);
    const [changeImage, setImageChange] = useState(false);

    function setDefault(){
        setImageChange(false);
        setLoginChange(false);
        setEnteredData({image: "", name:""});
    }

    function setChanges(){
        if (!(changeLogin || changeImage)) {
            if (enteredData.name !== "") {
                setLoginChange(true);
            }
            if (enteredData.image !== ""){
                let isUrl = true;
                let url;
                try{
                    url = new URL(enteredData.image)
                }
                catch (e) {
                    isUrl = false;
                    alert("link is not valid");
                    setLoginChange(false);
                    setEnteredData({...enteredData, image: ""});
                }
                if (isUrl) {
                    enteredData.image = url.toString();
                    setImageChange(true);
                }
            }
        }
        else {
            for (let field in enteredData)
                if (enteredData[field] === "")
                    delete enteredData[field];
            setUser({...user, ...enteredData});
            setIsUpdateModal(false);
        }
    }

    return (
        <Modal setModal={setIsUpdateModal} EnterCallback={setChanges}>
            <div className="update_exit"
                onClick={() => {
                setUser(DefaultUser);
                setIsUpdateModal(false);
            }}
            >Sign out</div>

            <div className="userUpdate_previewLabel">
                <p>Preview:</p>
                <hr/>
            </div>
            <div className="userUpdate_preview">
                <div className="login_userImg">
                    <div className="login_imageBox">
                        <img src={!changeImage? user.image: enteredData.image} alt="user"/>
                    </div>
                </div>
                <span></span>
                <p>{!changeLogin? user.name: enteredData.name}</p>
            </div>

            <div className="login_input">
                <label htmlFor="name">Enter new login:</label>
                <MyInputText
                    value={enteredData.name}
                    onChange={(e) => setEnteredData({...enteredData, name: e.target.value})}
                    id="name"
                    type="text"
                />
            </div>
            <div className="login_input">
                <label htmlFor="image">Enter link to an image:</label>
                <MyInputText
                    value={enteredData.image}
                    onChange={(e) => setEnteredData({...enteredData, image: e.target.value})}
                    id="image"
                    type="text"
                />
            </div>

            {!(changeImage || changeLogin)?
                <MyButton onClick={setChanges} disabled={enteredData.name==="" && enteredData.image===""}>Save changes</MyButton>
                :
                <div className="update_changeButtons">
                    <img
                        onClick={setChanges}
                        src="https://cdn-icons.flaticon.com/png/512/4436/premium/4436481.png?token=exp=1657443137~hmac=2dbf7bd6cb681f8d13192d2c45a67b0e"
                        alt=""
                    />
                    <img
                        onClick={setDefault}
                        src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
                        alt=""
                    />
                </div>
            }


        </Modal>
    );
};

export default UserUpdate;