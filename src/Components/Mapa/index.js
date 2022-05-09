import React from "react";
import DOMPurify from "dompurify";

function Mapa() {
    const myHTML = `<h1>Mapa<h1>`;
    const mySafeHTML = DOMPurify.sanitize(myHTML);
    return (
        <React.Fragment>
            <div dangerouslySetInnerHTML={{ __html: mySafeHTML }}/>
        </React.Fragment>
    )
}

export default Mapa;