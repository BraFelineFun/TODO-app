import MyButton from "../UI/button/MyButton";
import MyUser from "../UI/user/MyUser";
import React, {useRef, useState} from 'react'
import classes from './Header.module.css'

const Header = React.memo( ({setPageNumber,isMobile, isDataLoaded, setIsModal, setIsLoginModal, user}) => {


    const [isMenu, setIsMenu] = useState(false)

    function toggleWrapper(classN){
        return isMenu? [classN, classes.__activeMenuWrapper].join(" "): classN;
    }
    function toggleBurger(classN){
        return isMenu? [classN, classes.__activeMenuBurger].join(" "): classN;
        //SideBar functionality
    }

    return (
        <header>
            <div
                className={toggleBurger(classes.burger)}
                onClick={_ => setIsMenu((prev) =>  !prev)}
            >
                <span className={toggleBurger("")}></span>
            </div>

            <div className={classes.header__desktopWrapper}>
                <h1 >TODO LIST</h1>
                {!isMobile &&
                    <MyUser user={user} setIsLoginModal={setIsLoginModal}/>
                }
            </div>

            <div className={[classes.addTask, classes.smallBtn].join(" ")}>
                <MyButton
                    disabled={!isDataLoaded}
                    onClick={() => setIsModal(true)}
                >
                    Add task
                </MyButton>
            </div>



            <div
                className={toggleWrapper(classes.menu__wrapper)}
                onClick={_ => setIsMenu((prev) =>  !prev)}
            >
                <div className={classes.menu} onClick={e => e.stopPropagation()}>
                    <div className="">
                        {isMobile && <MyUser user={user} setIsLoginModal={setIsLoginModal}/>}
                    </div>

                    {/*menu_navigation??????????????*/}
                    <div>
                        <nav>
                            <h2 className={classes.menu__title}>Navigation</h2>
                            <p
                                onClick={() => {
                                    setIsMenu((prev) =>  !prev);
                                    setPageNumber(0);
                            }}
                            >Undo tasks</p>

                            <p
                                onClick={() => {
                                    setIsMenu((prev) =>  !prev);
                                    setPageNumber(1);
                            }}
                            >
                                Done tasks
                            </p>
                        </nav>
                    </div>

                </div>
            </div>

        </header>
    );
});

export default Header;