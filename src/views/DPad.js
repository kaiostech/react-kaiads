import React, {useState, useEffect} from 'react';
import {SoftKeys} from '../components/SoftKeys';
import {NavItem} from '../components/NavItem';
import PropTypes from 'prop-types';
import '../css/DPad.css';

export const DPad = ({viewIndex, navToView}) => {
    const initialState = {
        navItems: [
            {name: 'K', focus: true, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'A', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'I', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'O', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'S', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
        ],
        activeNavItem: 0,
    }
    const [state, setState] = useState(initialState);
    function moveUp(prevState) {
        const newState = {...prevState};
        newState.navItems[newState.activeNavItem].focus = false;
        if (newState.activeNavItem === 0) {
            newState.navItems[newState.navItems.length - 1].focus = true;
            newState.activeNavItem = newState.navItems.length - 1;
        } else {
            newState.navItems[newState.activeNavItem - 1].focus = true;
            newState.activeNavItem -= 1;
        }
        return newState;
    }
    function moveDown(prevState) {
        const newState = {...prevState};
        newState.navItems[newState.activeNavItem].focus = false;
        if (newState.activeNavItem === newState.navItems.length - 1) {
            newState.navItems[0].focus = true;
            newState.activeNavItem = 0;
        } else {
            newState.navItems[newState.activeNavItem + 1].focus = true;
            newState.activeNavItem += 1;
        }
        return newState;
    }
    const navItemStyles = {
        width: '100%',
        height: '30px',
    }
    useEffect(() => {
        state.navItems.forEach(item => {
            item.onKeyLeft = () => {
                if (viewIndex > 0) {
                    navToView(0);
                }
            }
            item.onArrowUp = () => setState(prevState => moveUp(prevState));
            item.onArrowDown = () => setState(prevState => moveDown(prevState));
            item.onArrowLeft = () => setState(prevState => moveUp(prevState));
            item.onArrowRight = () => setState(prevState => moveDown(prevState));
        });
    }, []);
    
    const view = (
        <div className="DPad-container">
            {state.navItems.map((item, index) => <NavItem name={item.name} focus={item.focus} key={index} style={{...navItemStyles}}/>)}
        </div>
    );
    return (
        <React.Fragment>
            {view}
            <SoftKeys
                activeNavItem={state.navItems[state.activeNavItem]}
                viewIndex={viewIndex}
            />
        </React.Fragment>
    );
}

DPad.propTypes = {
    viewIndex: PropTypes.number.isRequired,
    navToView: PropTypes.func.isRequired,
}