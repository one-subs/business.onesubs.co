import React from 'react';
import { ReactComponent as NotFoundImg } from '../styles/images/not_found.svg';

const NotFound = () => {
    return (
        <div className="description">
            <div className="page_width">
                <h1 style={{ marginTop: '100px', fontSize: '30px' }}>Page not found, press Overview to return to the main page.</h1>
                <NotFoundImg style={{ marginTop: '50px', width: '400px', height: '350px' }}/>
            </div>
        </div>
    );
};

export default NotFound;