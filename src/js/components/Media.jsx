

import React from "react";


const Media = ( { data } )=>{

    console.log("on est dans Media.jsx")
    console.log(data)
    const id = data.id;

    return (
        <div className="media">
            <div className="media__author">
                <p>{"user id => " + data.userId}</p>
            </div>
            <p>{data.title}</p>
            <div className="media__picture">
                <img src={data.urlImage} />
            </div>
            <p>{data.text}</p>
            <div className="media__action">
                <button>j'aime</button>
                <button>commenter</button>
                <button>s'ignaler</button>
            </div>
        </div>
    )
}

export default Media;