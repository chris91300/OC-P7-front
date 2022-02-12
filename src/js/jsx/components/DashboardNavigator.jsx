
import React from "react";

const DashboardNavigator = ( { showMediasReported, showCommentsReported } )=>{



    return(
        <div className="dashboard__nav">
            <button onClick={()=> showMediasReported()} title="voir les medias qui ont été signalés">Médias signalés</button>
            <button onClick={()=> showCommentsReported()} title="voir les commentaires qui ont été signalés">Commentaires signalés</button>
        </div>
    )

}


export default DashboardNavigator;