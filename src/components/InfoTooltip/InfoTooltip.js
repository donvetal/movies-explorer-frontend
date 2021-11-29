import React from "react";
import './InfoTooltip.css';
import fail from '../../images/info-tooltip-fail.svg';
import successImg from '../../images/info-tooltip-success.svg';


function InfoTooltip({isOpen, onClose,result, message}) {
    return (
        <div className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button onClick={onClose} type="button"
                        className={`popup__close popup__close_type_info-tooltip`}></button>
                <img src={result ? successImg : fail} alt="изображение" className="popup__info-tooltip-image"/>
                <p className="popup__info-tooltip-title">{message}</p>
            </div>
        </div>

    );
}

export default InfoTooltip;