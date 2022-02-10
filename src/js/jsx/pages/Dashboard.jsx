

import React from "react";
import ProfilAside from "../layout/ProfilAside.jsx";
import DashboardMedias from "../components/DashboardMedias.jsx";
import DashboardComments from "../components/DashboardComments.jsx";
import AppLayout from "../layout/AppLayout.jsx";


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