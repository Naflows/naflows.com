import React from "react";
import PropTypes from "prop-types";
import '../../public/styles/components/routesSelection.scss';
import loader from "../modules/loader";


function darkenHexColor(hex, percent) {
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));

    r = Math.min(Math.max(0, r), 255);
    g = Math.min(Math.max(0, g), 255);
    b = Math.min(Math.max(0, b), 255);

    const darkenedHex = `#${(r).toString(16).padStart(2, '0')}${(g).toString(16).padStart(2, '0')}${(b).toString(16).padStart(2, '0')}`;

    return darkenedHex;
}


const RunAlgus = (algus, setRoute, route) => {
    loader.enable();
    const today = new Date();
    algus.run({
        name : route.route_short_name,
        date : `${today.getFullYear()}${today.getMonth()+1}${today.getDay()}`,
        direction : null,
        block_id : null
    },(albusContent) => {
        setRoute(albusContent);
        loader.disable();
    })
}

class RoutesSelection extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const routes = this.props.routes;
        const algus = this.props.algus;
        const setRoute = this.props.setRoute;
        return (
            <div className="routes">
            {
              routes.map((route, index) => (
                <div key={index} className="route" style={{
                    backgroundColor: "#" + route.route_color,
                    color: "#" + route.route_text_color
                    }}
                    onClick={() => RunAlgus(algus,setRoute, route)}
                >
                    <div className="route-short-name" style={{
                        backgroundColor: darkenHexColor(route.route_color, 10)
                    }}>
                        {route.route_short_name}
                    </div>
                    <div className="route-long-name">
                      {route.route_long_name}
                    </div>
                </div>
              ))
            }
        </div>
        )
    }
}

RoutesSelection.propTypes = {
    routes : PropTypes.array.isRequired,
    algus : PropTypes.object.isRequired,
    setRoute : PropTypes.func.isRequired
}

export default RoutesSelection;
