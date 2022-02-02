
import React from "react";

import forumTexts from '../../img/forum_texts.jpg';
import forumMultimedia from '../../img/forum_multimedias.jpg';
import dashboard from '../../img/dashboard_big.jpg';
import MenusItem from "./MenusItem.jsx";



const Menus = ( { admin } )=>{


    return(
        <div className="menus">
            <MenusItem
                img={forumMultimedia}
                link="/medias"
                title="accéder au forum sur les multimedias"
                altText="image représentant un logo de forum sur les multimedias"
                text="forum multimedias"
            />
            <MenusItem
                img={forumTexts}
                link="/menu"
                title="accéder au forum pour communiquer entre employés"
                altText="image représentant un logo de forum pour communiquer entre employés"
                className="disabled"
                text="forum textes"
                comingSoon
            />
            { admin ?
            <MenusItem
                img={dashboard}
                link="/admin/dashboard"
                title="accéder au dashboard administrateur"
                altText="image représentant un logo de dashboard administrateur"
                text="dashboard admin"
            />
            : null }
        </div>
    )

}


export default Menus;