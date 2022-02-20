
/**
 * Render the single page application
 */
exports.APPLICATION = ( req, res ) => {

    res.render("index")
}


/**
 * check if user has a session
 * and if session is not expire
 */
exports.GET_SESSION = ( req, res ) => {
   
    let session = req.session;
    if ( session.userSession ) {
        let expire = session.cookie._expires;
        let expireTimestamp = new Date(expire).getTime();        
        let currentTimestamp = Date.now();
        
        // checks if the cookie has expired
        if ( currentTimestamp < expireTimestamp ) {

            res.status(200).json( { sessionIsOk : true, user : session.userSession } )

        }
        else {
            
            res.status(200).json( { sessionIsOk : false } )
        }
        
    } else {
        
        res.status(200).json( { sessionIsOk : false } )
    }
}


/**
 * create a user session
 */
exports.SET_SESSION = ( req, res ) => {
   
    req.session.userSession = req.body;
    res.status(200).json({message : "session créé"})

}

/**
 * delete a user session
 */
exports.DELETE_SESSION = ( req, res ) => {
    
    req.session.destroy();
    res.status(200).json( { status : "ok", message : "session supprimé" } )

}


/**
 * error 404 : redirect to '/' (home)
 */
 exports.ERROR_404 = ( req, res ) => {

    res.status(301).redirect("/")
}