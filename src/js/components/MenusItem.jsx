
import React from "react";
import { Link } from "react-router-dom";



const MenusItem = ( { img, link, title, altText, className, text, comingSoon } )=>{


    return(
        <Link to={link} title={title} className={className? className : null}>
            <div className="menus-item__container">
                <img src={img} alt={altText} />
                <p className="menus-item__text">{text}</p>
                {comingSoon ? <div className="coming-soon"><p>coming soon</p></div> : null}
            </div>
        </Link>
    )

}


export default MenusItem;