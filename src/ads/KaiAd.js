import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

export const KaiAd = ({banner, focus, focusStyles}) => {
    useEffect(() => {
        function setStyles() {
            document.getElementById('ad-container').style.margin = 'auto';
            if (focus) {
                Object.keys(focusStyles).forEach(key => {
                    document.getElementById('ad-container').style[key] = focusStyles[key];
                })
            }
        }
        if(window.isKaiAdLoad) {
            if (banner) {
                window.loadKaiAd('ad-container', setStyles);
            } else {
                window.loadKaiAd();
            }
        }
        return () => window.ads = null;
    }, []);
    const adContainer = banner ?
    <div id='ad-container' style={focus && window.ads ? {...focusStyles} : {}}></div> :
    <span/>;
    return adContainer;
}

KaiAd.propTypes = {
    banner: PropTypes.bool,
    focus: PropTypes.bool,
    focusStyles: PropTypes.objectOf(PropTypes.string),
}
KaiAd.defaultProps = {
    banner: false,
    focus: false,
    focusStyles: {},
}