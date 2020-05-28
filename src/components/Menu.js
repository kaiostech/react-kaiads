import React from 'react';
import PropTypes from 'prop-types';
import '../css/Menu.css';

export const Menu = ({show, title, menuItems}) => {
    const lockLayer = {
        display: show ? '' : 'none',
    }
    return (
        <div className="lock-layer" style={lockLayer}>
            <div className="fade-in dialog">
                <div className="menu">
                    <h3 className="menu-title">{title}</h3>
                    {menuItems}
                </div>
            </div>
        </div>
    );
}

Menu.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    menuItems: PropTypes.arrayOf(PropTypes.element).isRequired,
}