import React from "react";
import { Link } from "react-router-dom";
import "./Linktree.scss"

function Linktree(props){
    return (
        <div className="linktree-container">
            <Link to={"/"}>
                <span>Home</span>
            </Link>
            <span className="arrow">
                >
            </span>
            <Link to={"/photos"}>
                <span>Tour</span>
            </Link>
        </div>
    )
}

export default Linktree;
