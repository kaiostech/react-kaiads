import React, {useState, useEffect} from 'react';
import {SoftKeys} from '../components/SoftKeys';
import {NavItem} from '../components/NavItem';
import {KaiAd} from '../ads/KaiAd';
import PropTypes from 'prop-types';
import '../css/BannerAd.css';

export const BannerAd = ({viewIndex, navToView}) => {
    const initialState = {
        navItems: [
            {name: 'K', focus: true, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'A', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'I', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'O', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'S', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'KaiAd', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
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
    useEffect(() => {
        state.navItems.forEach(item => {
            item.onKeyLeft = () => {
                if (viewIndex > 0) {
                    navToView(0);
                }
            }
            item.onKeyCenter = () => {
                if (item.name === 'KaiAd') {
                    if (window.isKaiAdLoad) {
                        window.ads.call("click");
                    }
                }
            }
            item.onArrowUp = () => setState(prevState => moveUp(prevState));
            item.onArrowDown = () => setState(prevState => moveDown(prevState));
            item.onArrowLeft = () => setState(prevState => moveUp(prevState));
            item.onArrowRight = () => setState(prevState => moveDown(prevState));
        });
    }, []);
    const navItemStyles = {
        width: '100%',
        height: '30px',
        borderRadius: '10px',
    }
    const ad = state.navItems.filter((item) => item.name === 'KaiAd')[0];
    const view = (
        <div className="banner-container">
            {state.navItems.filter(item => item.name !== 'KaiAd').map((item, index) => <NavItem name={item.name} focus={item.focus} key={index} style={{...navItemStyles}}/>)}
            <KaiAd
                banner
                focus={ad.focus}
                focusStyles={{
                    border: '5px solid red',
                }}
            />
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

BannerAd.propTypes = {
    viewIndex: PropTypes.number.isRequired,
    navToView: PropTypes.func.isRequired,
}