import React from 'react';
import { connect } from 'react-redux';

import useHeaderStyles from "./HeaderStyle";

const Header = () => {
    
    const classes = useHeaderStyles();
    console.log('Rendering Users List')

    return (
        <div className={classes.outerContainer}>
            <span>Date: {new Date(Date.now()).toDateString()}</span>
            <span className={classes.heading}>My Awesome List</span>  
            <span>By: Oluwaseun Aderinlokun</span>
        </div>
    );
}

export default connect()(Header);