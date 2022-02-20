
import React from "react";


/**
 * the container of 2 buttons
 * admin can check the reported medias or reported comments
 * @param {function} showMediasReported callback for show medias reported
 * @param {function} showCommentsReported callback for show comments reported
 */
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