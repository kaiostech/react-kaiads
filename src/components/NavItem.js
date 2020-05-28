import React from 'react';
import PropTypes from 'prop-types';
import '../css/NavItem.css';

export const NavItem = ({name, focus, style}) => {
    const styles = 
    focus ?
    {
        backgroundColor: '#E7E7E7',
        color: 'rgba(0, 0, 0, 0.87)',
    } :
    {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
    }
    const navItemStyles = {
        ...styles,
        ...style,
    }
    return <div className="nav-item" style={navItemStyles}><span>{name}</span></div>;
}

NavItem.propTypes = {
    name: PropTypes.string.isRequired,
    focus: PropTypes.bool.isRequired,
    style: PropTypes.object,
}