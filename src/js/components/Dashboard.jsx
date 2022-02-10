

import React from "react";
import HeaderApp from "./HeaderApp.jsx";
import Footer from "./Footer.jsx";
import ProfilAside from "./ProfilAside.jsx";
import DashboardMedias from "./DashboardMedias.jsx";
import DashboardComments from "./DashboardComments.jsx";
import AppLayout from "./AppLayout.jsx";


/**
 * the page of the administrator dashboard
 */
const Dashboard = ()=>{

   

    return (
        <AppLayout title="DASHBOARD ADMINISTRATEUR">
            <div className="main__container">
                <ProfilAside />
                <div className="main__container__section">
                    <DashboardMedias />
                    <DashboardComments /> 
                </div>
            </div> 
        </AppLayout>
    )
}


export default Dashboard;