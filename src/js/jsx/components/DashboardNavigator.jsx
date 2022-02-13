
import React from "react";

const DashboardNavigator = ( { showMediasReported, showCommentsReported } )=>{



    return(
        <div className="dashboard__nav">
            <button
                className="btn__no-style"
                onClick={()=> showMediasReported()}
                title="voir les medias qui ont été signalés">
                    Médias
            </button>

            <button
                className="btn__no-style"
                onClick={()=> showCommentsReported()}
                title="voir les commentaires qui ont été signalés">
                    Commentaires
            </button>
        </div>
    )

}


export default DashboardNavigator;