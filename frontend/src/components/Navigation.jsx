import React from "react";

const Navigation = ({child, token}) => {
    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <a className="navbar-brand" href={token ? "/chat" : "/"}>Hexlet Chat</a>
                {child}
            </div>
        </nav>
    )
}

export default Navigation;