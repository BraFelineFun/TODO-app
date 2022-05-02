import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MyUser from "./UI/user/MyUser";

const Header = ({isDataLoaded, setIsModal, userName}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 806);

    useEffect(() =>{
        console.log("изменился");
    })

    //Debounce function to prevent multiply state change,
    // but probably might have problems if used manyTimes
    // because this in function uses window context
    function debounce(callee, timeoutMs) {
        return function perform(...args) {
            let previousCall = this.lastCall;
            this.lastCall = Date.now();
            if (previousCall && this.lastCall - previousCall <= timeoutMs) {
                clearTimeout(this.lastCallTimer);
            }
            this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
        };
    }
    let setter = () =>{
        setIsMobile(window.innerWidth < 806)
    }
    const debouncedSetIsMobile = debounce(setter, 50);

    window.addEventListener('resize', debouncedSetIsMobile)


    function updateMenu(){

        //SideBar functionality
        const burger = document.querySelector(".burger");
        burger.classList.toggle('--activeMenuBurger');
        burger.children[0].classList.toggle("--activeMenuBurger");
        document.querySelector(".menu__wrapper").classList.toggle("--activeMenuWrapper");

    }

    return (
        <header>
            <div className={"burger"} onClick={updateMenu}>
                <span></span>
            </div>

            <div className="header__desktopWrapper">
                <div className="header__title">
                    <h1 >TODO LIST</h1>
                </div>
                {!isMobile && <MyUser userName={userName}/>}
            </div>

            <div className="addTask --smallBtn">
                <MyButton disabled={!isDataLoaded} onClick={() => setIsModal(true)}>Add task</MyButton>
            </div>



            <div className="menu__wrapper" onClick={updateMenu}>
                <div className="menu" onClick={e => e.stopPropagation()}>
                    <div className="menu__user">
                        {isMobile && <MyUser userName={userName}/>}
                    </div>

                    <div className="menu__navigation">
                        <nav>
                            <h2 className={"menu__title"}>Navigation</h2>
                            <a href={"#Undone Tasks"} onClick={updateMenu}>Undo tasks</a>
                            <a href={"#Done Tasks"} onClick={updateMenu}>Done tasks</a>
                        </nav>
                    </div>

                </div>
            </div>

        </header>
    );
};

export default Header;