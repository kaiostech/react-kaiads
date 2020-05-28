import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import '../css/SoftKeys.css';

export const SoftKeys = ({ viewIndex, activeNavItem}) => {
    useEffect(() => {
        const onKeyLeft = () => {
            activeNavItem.onKeyLeft();
        };
        const onKeyCenter = () => {
           activeNavItem.onKeyCenter();
        };
        const onKeyRight = () => {
            activeNavItem.onKeyRight();
        };
        const onArrowLeft = () => {
            activeNavItem.onArrowLeft();
        };
        const onArrowRight = () => {
            activeNavItem.onArrowRight();
        };
        const onArrowUp = () => {
            activeNavItem.onArrowUp();
        };
        const onArrowDown = () => {
            activeNavItem.onArrowDown();
        };
        
        const handleKeyDown = e => {
            switch (e.key) {
                case "l": // If you are testing on browser, you can press "l" on keyboard to simulate left key press
                case "SoftLeft": onKeyLeft(); break; // when left key on KaiOS device is pressed
                case "Enter": onKeyCenter(); break;
                case "r": // If you are testing on browser, you can press "r" on keyboard to simulate left key press
                case "SoftRight": onKeyRight(); break; // when right key on KaiOS device is pressed
                case "ArrowLeft": onArrowLeft(); break;
                case "ArrowRight": onArrowRight(); break;
                case "ArrowUp": onArrowUp(); break;
                case "ArrowDown": onArrowDown(); break;
                default:
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return  () => document.removeEventListener("keydown", handleKeyDown);
    }, [activeNavItem, viewIndex]);
    
    let leftKey = viewIndex > 0 ? 'BACK' : activeNavItem.left ? activeNavItem.left : '';
    let rightKey = activeNavItem.right ? activeNavItem.right : '';
    let centerKey = activeNavItem.center ? activeNavItem.center : 'SELECT';

    return (
        <div className="key-pad">
            <span className="keys">{leftKey}</span>
            <span className="keys">{centerKey}</span>
            <span className="keys">{rightKey}</span>
        </div>
    );
}

SoftKeys.propTypes = {
    viewIndex: PropTypes.number.isRequired,
    activeNavItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        onArrowUp: PropTypes.func.isRequired,
        onArrowDown: PropTypes.func.isRequired,
        onArrowLeft: PropTypes.func.isRequired,
        onArrowRight: PropTypes.func.isRequired,
        onKeyLeft: PropTypes.func.isRequired,
        onKeyCenter: PropTypes.func.isRequired,
        onKeyRight: PropTypes.func.isRequired,
        left: PropTypes.string,
        center: PropTypes.string,
        right: PropTypes.string
    }).isRequired,
};