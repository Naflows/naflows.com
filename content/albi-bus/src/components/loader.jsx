import React from "react";
import '../../public/styles/modules/loader.scss';




class Loader extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="loader-content">
                <span id="algus">Algus analyse votre requête</span>
                <span className="loader">
                    <img src="../../public/frames/algus.png" />
                </span>
            </div>
        )
    }
}


export default Loader;