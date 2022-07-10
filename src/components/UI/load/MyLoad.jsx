import React, {forwardRef} from 'react';
import cl from './MyLoad.module.css'

const MyLoad = forwardRef((props, ref) => {
    return (
        <div ref={ref} className={cl.loading}>
            <svg className={cl.spinner} viewBox="0 0 50 50">
                <circle className={cl.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
        </div>
    );
});

export default MyLoad;