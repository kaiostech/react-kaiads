import React, {useEffect, useState} from 'react';
import {Menu} from '../components/Menu';
import {NavItem} from '../components/NavItem';
import {SoftKeys} from '../components/SoftKeys';
import icon from '../images/kaios_56.png';
import PropTypes from 'prop-types';
import '../css/Dashboard.css';

export const Dashboard = ({viewIndex, navToView}) => {
    const initialState = {
        dashboardNavItems: [
            {name: 'D Pad', focus: true, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'Fullscreen Ad', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'Banner Ad', focus: false, right: 'MENU', onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: '', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: '', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: '', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
        ],
        menuNavItems: [
            {name: 'Option 1', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'Option 2', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}},
            {name: 'Option 3', focus: false, onKeyLeft: () => {}, onKeyRight: () => {}, onKeyCenter: () => {}, onArrowUp: () => {}, onArrowDown: () => {}, onArrowLeft: () => {}, onArrowRight: () => {}}
        ],
        activeView: 'dashboard',
        activeViewItem: 0,
        showMenu: false,
        prevActiveViewItem: 0,
    }
    const [state, setState] = useState(initialState);

    function createStateToMoveUp(prevState, typeOfNavItems) {
        const newState = { ...prevState };
        if (newState.activeViewItem !== 0) {
            newState[typeOfNavItems][newState.activeViewItem].focus = false;
            newState[typeOfNavItems][newState.activeViewItem - 1].focus = true;
            newState.activeViewItem -= 1;
        }
        return newState;
    }

    function createStateToMoveDown(prevState, typeOfNavItems) {
        const newState = { ...prevState };
        if (newState.activeViewItem !== newState[typeOfNavItems].length - 1) {
            newState[typeOfNavItems][newState.activeViewItem].focus = false;
            newState[typeOfNavItems][newState.activeViewItem + 1].focus = true;
            newState.activeViewItem += 1;
        }
        return newState;
    }

    function createStateToMoveLeft(prevState, typeOfNavItems) {
        const newState = { ...prevState };
        if (newState.activeViewItem === 3 || newState.activeViewItem === 4 || newState.activeViewItem === 5) {
            newState[typeOfNavItems][newState.activeViewItem].focus = false;
            newState[typeOfNavItems][newState.activeViewItem - 3].focus = true;
            newState.activeViewItem -= 3;   
        }
        return newState;
    }

    function createStateToMoveRight(prevState, typeOfNavItems) {
        const newState = { ...prevState };
        if (newState.activeViewItem === 0 || newState.activeViewItem === 1 || newState.activeViewItem === 2) {
            newState[typeOfNavItems][newState.activeViewItem].focus = false;
            newState[typeOfNavItems][newState.activeViewItem + 3].focus = true;
            newState.activeViewItem += 3;
        }
        return newState;
    }

    useEffect(() => {
        const defDashboardItemBehavior = [...state.dashboardNavItems];
        defDashboardItemBehavior.forEach((item) => {
            item.onKeyLeft = () => {
                if (viewIndex > 0) {
                    navToView(viewIndex - 1);
                }
            };
            item.onKeyRight = () => {
                if (item.right === 'MENU') {
                    setState(prevState => {
                        const newState = {
                            ...prevState,
                            activeView: 'menu',
                            showMenu: true,
                            prevActiveViewItem: prevState.activeViewItem,
                            activeViewItem: 0,
                        };
                        newState.dashboardNavItems[prevState.activeViewItem].focus = false;
                        newState.menuNavItems[newState.activeViewItem].focus = true;
                        return newState;
                    })
                }
            };
            item.onKeyCenter = () => {
                if (item.name === 'D Pad') {
                    setState({...initialState});
                    navToView(viewIndex + 1);
                } else if (item.name === 'Fullscreen Ad') {
                    setState({...initialState});
                    navToView(viewIndex + 2);
                } else if (item.name === 'Banner Ad') {
                    setState({...initialState});
                    navToView(viewIndex + 3);
                }
            };
            item.onArrowUp = () => setState(prevState => createStateToMoveUp(prevState, 'dashboardNavItems'));
            item.onArrowLeft = () => setState(prevState => createStateToMoveLeft(prevState, 'dashboardNavItems'));
            item.onArrowDown = () => setState(prevState => createStateToMoveDown(prevState, 'dashboardNavItems'));
            item.onArrowRight = () => setState(prevState => createStateToMoveRight(prevState, 'dashboardNavItems'));
        });

        const defMenuItemBehavior = [...state.menuNavItems];
        defMenuItemBehavior.forEach((item) => {
            item.onKeyLeft = () => {};
            item.onKeyRight = () => {};
            item.onKeyCenter = () => setState(prevState => {
                const newState = {
                    ...prevState,
                    activeView: 'dashboard',
                    showMenu: false,
                    activeViewItem: prevState.prevActiveViewItem,
                };
                newState.dashboardNavItems[newState.prevActiveViewItem].focus = true;
                newState.menuNavItems[prevState.activeViewItem].focus = false;
                return newState;
            });
            item.onArrowUp = () => setState(prevState => createStateToMoveUp(prevState, 'menuNavItems'));
            item.onArrowLeft = item.onArrowUp;
            item.onArrowDown = () => setState(prevState => createStateToMoveDown(prevState, 'menuNavItems'));
            item.onArrowRight = item.onArrowDown;
        });

        setState(initialState => ({
            ...initialState,
            dashboardNavItems: defDashboardItemBehavior,
            menuNavItems: defMenuItemBehavior,
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const navItemStyles = {
        width: '100%',
        height: '60px',
        borderRadius: '10px',
        border: '1px solid #E7E7E7', 
    }
    const dashboardItems = state.dashboardNavItems.map((item, index) => <NavItem name={item.name} focus={item.focus} key={index} style={{...navItemStyles, margin: index === 1 || index === 4 ? '5px 0px' : ''}}/>);
    const dashboardView = 
        <React.Fragment>
            <div className="left-column">
                {dashboardItems.filter((item, index) => index < 3)}
            </div>
            <div className="right-column">
                {dashboardItems.filter((items, index) => index >=3 && index<dashboardItems.length)}
            </div>
        </React.Fragment>
    const view = (
        <div className="dashboard">
            <div className="dashboard-header">
                <div className="dashboard-header-wrapper">
                    <span className="dashboard-header-title">Dashboard</span>
                    <span className="dashboard-header-sub">3 item(s)</span>
                </div>
                <img alt="icon" className="dashboard-icon" src={icon}></img>
            </div>
            <div className="container">
                {dashboardView}
            </div>
        </div>
    );

    const menuButtons = state.menuNavItems.map((item, index) => <NavItem name={item.name} focus={item.focus} style={{flex: 1}} key={index}/>)
    
    return (
        <React.Fragment>
            <div className="background"></div>
            {view}
            <Menu
                show={state.showMenu}
                title="Menu Title"
                menuItems={menuButtons}
            />
            <SoftKeys
                viewIndex={viewIndex}
                activeNavItem={
                    state.activeView === 'dashboard' ?
                    state.dashboardNavItems[state.activeViewItem] :
                    state.menuNavItems[state.activeViewItem]
                }
            />
        </React.Fragment>
    );
}

Dashboard.propTypes = {
    viewIndex: PropTypes.number.isRequired,
    navToView: PropTypes.func.isRequired,
}