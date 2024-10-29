
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

function Layout({children}: {children: ReactNode;}) {
    return (
        <div className="layout">
            <Navbar/>

            {children}
        </div>
    );
}

export default Layout;