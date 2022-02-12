
import React from "react";
import { Link } from "react-router-dom";


/**
 * Component MenuItem
 * Represente one menu
 * @param {string} img the image src 
 * @param {string} linkUrl the page url
 * @param {string} title title menu
 * @param {string} altText the altText attribute
 * @param {string} className the className attribute
 * @param {string} text the description of the menu
 * @param {boolean} comingSoon if the menu is available or not
 * @returns 
 */
const MenusItem = ( { img, linkUrl, title, altText, className, text, comingSoon } )=>{
    

    return(
        <Link to={linkUrl} title={title} className={className? className : null}>
            <div className="menus-item__container">
                <img src={img} alt={altText} />
                <p className="menus-item__text">{text}</p>
                {comingSoon ? <div className="coming-soon"><p>coming soon</p></div> : null}
            </div>
        </Link>
    )

}


export default MenusItem;