
import React from "react";

import forumTexts from '../../img/forum_texts.jpg';
import forumMultimedia from '../../img/forum_multimedias.jpg';
import dashboard from '../../img/dashboard_big.jpg';
import MenusItem from "./MenusItem.jsx";


/**
 * the list of the menu
 * FORUM MULTIMEDIA
 * FORUM TEXT ( coming soon )
 * DASHBOARD if admin
 * @param {*} admin if user is admin or not
 * @returns 
 */
const Menus = ( { admin } )=>{


    return(
        <div className="menus">
            <MenusItem
                img={forumMultimedia}
                linkUrl="/medias"
                title="accéder au forum sur les multimedias"
                altText="image représentant un logo de forum sur les multimedias"
                text="forum multimedias"
            />
            <MenusItem
                img={forumTexts}
                linkUrl="/menu"
                title="accéder au forum pour communiquer entre employés"
                altText="image représentant un logo de forum pour communiquer entre employés"
                className="disabled"
                text="forum textes"
                comingSoon
            />
            { admin ?
            <MenusItem
                img={dashboard}
                linkUrl="/admin/dashboard"
                title="accéder au dashboard administrateur"
                altText="image représentant un logo de dashboard administrateur"
                text="dashboard admin"
            />
            : null }
        </div>
    )

}


export default Menus;