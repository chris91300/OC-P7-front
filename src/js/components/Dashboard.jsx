

import React from "react";
import HeaderApp from "./HeaderApp.jsx";
import Footer from "./Footer.jsx";
import ProfilAside from "./ProfilAside.jsx";
import DashboardMedias from "./DashboardMedias.jsx";
import DashboardComments from "./DashboardComments.jsx";


const Dashboard = ()=>{


    return (
        <>
        <HeaderApp />
        <main>
            <h1>DASHBOARD ADMINISTRATEUR</h1>
            <div className="main__container">
                <ProfilAside />
                <div className="main__container__section">
                    <DashboardMedias />
                    <DashboardComments /> 
                </div>
            </div>          
        </main>
        <Footer />
        </>
    )
}


export default Dashboard;