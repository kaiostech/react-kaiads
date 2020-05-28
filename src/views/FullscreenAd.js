import React from 'react';
import {SoftKeys} from '../components/SoftKeys';
import {KaiAd} from '../ads/KaiAd';

export const FullscreenAd = ({viewIndex, navToView}) => {
    return (
        <React.Fragment>
            <KaiAd/>
            <SoftKeys
                activeNavItem={{
                    name: '',
                    focus: false,
                    onArrowUp: () => {},
                    onArrowLeft: () => {},
                    onArrowRight: () => {},
                    onArrowDown: () => {},
                    onKeyLeft: () => {navToView(0);},
                    onKeyCenter: () => {},
                    onKeyRight: () => {},
                }}
                viewIndex={viewIndex}
            />
        </React.Fragment>
    );
}
