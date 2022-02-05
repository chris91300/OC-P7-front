

exports.APPLICATION = ( req, res ) => {

    res.render("index")
}


exports.GET_SESSION = ( req, res ) => {
   
    let session = req.session;
    if ( session.userSession ) {
        let expire = session.cookie._expires;
        let expireTimestamp = new Date(expire).getTime();        
        let currentTimestamp = Date.now();
        
        if ( currentTimestamp < expireTimestamp ) {

            res.status(200).json( { sessionIsOk : true, user : session.userSession } )

        }
        else {
            //req.session.userSession = {}
            res.status(200).json( { sessionIsOk : false } )
        }
        
    } else {
        //req.session.userSession = {}
        res.status(200).json( { sessionIsOk : false } )
    }
}


exports.SET_SESSION = ( req, res ) => {

    req.session.userSession = req.body;
    res.status(200).json({message : "session créé"})

}