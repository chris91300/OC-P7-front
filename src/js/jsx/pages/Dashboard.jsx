

import React from "react";
import ProfilAside from "../layout/ProfilAside.jsx";
import DashboardMedias from "../components/DashboardMedias.jsx";
import DashboardComments from "../components/DashboardComments.jsx";
import AppLayout from "../layout/AppLayout.jsx";
import { useState } from "react";
import DashboardNavigator from "../components/DashboardNavigator.jsx";


/**
 * the page of the administrator dashboard
 */
const Dashboard = ()=>{


    const showMediasReported = ()=>{
        let adminMediasReportedElement = document.getElementById("admin_medias_reported");
        let adminCommentsReportedElement = document.getElementById("admin_comments_reported");
        
        if ( adminMediasReportedElement.classList.contains("hide") ) {
            
            adminMediasReportedElement.classList.remove("hide");
            adminMediasReportedElement.classList.add("show");
            adminCommentsReportedElement.classList.remove("show");
            adminCommentsReportedElement.classList.add("hide");

        }
    }

    const showCommentsReported = ()=>{
        
        let adminMediasReportedElement = document.getElementById("admin_medias_reported");
        let adminCommentsReportedElement = document.getElementById("admin_comments_reported");

        if ( adminCommentsReportedElement.classList.contains("hide") ) {
          
            adminMediasReportedElement.classList.remove("show");
            adminMediasReportedElement.classList.add("hide");
            adminCommentsReportedElement.classList.remove("hide");
            adminCommentsReportedElement.classList.add("show");

        }

    }

   

    return (
        <AppLayout title="DASHBOARD ADMINISTRATEUR">
            <div className="main__container">
                <ProfilAside />
                <div className="main__container__section">
                    <DashboardNavigator
                        showMediasReported = {showMediasReported}
                        showCommentsReported = {showCommentsReported}
                    /> 
                    <DashboardMedias />
                    <DashboardComments /> 
                </div>
            </div> 
        </AppLayout>
    )
}


export default Dashboard;