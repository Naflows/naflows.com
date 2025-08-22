import { useEffect, useState } from 'react';
import '../../../public/styles/hotbar.scss';
import PropTypes from 'prop-types';


const HotBar = ({routes}) => {
    const [view, setView] = useState(false);
    const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth <= 768);
    const [activeSpot, setActiveSpot] = useState("");

    useEffect(() => {
      const handleResize = () => {
        setIsPhoneScreen(window.innerWidth <= 768);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
        <div className={(view ? "view" : "") + " hotbar " + (isPhoneScreen ? "phone" : "")} >
            <div className="logo">
                <img src="/public/frames/long_logo.png" />
            </div>
            <div className="menu">
                <div className={"point slide " + (activeSpot === "horaires" ? "point-phone-view" : "")} onClick={() => setActiveSpot(activeSpot === "horaires" ? "" : "horaires")}>
                    <span>Horaires papiers</span>
                    <div className="slide-content">
                        {routes.map((route,index) => (
                            <div className="slide-route" key={index} onClick={() => window.open(`https://www.libea-mobilites.fr/sites/default/files/2023-08/${route.route_short_name}_Transports_Horaires_2023-24.pdf`)}>
                                <div className="small-name" style={{backgroundColor:"#" + route.route_color, color:"#FFFFFF"}}>
                                    {route.route_short_name}
                                </div>
                                <div className="long-name">
                                    {route.route_long_name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="point" onClick={() => window.open("https://www.libea-mobilites.fr/")}>
                    <span>Libéa</span>
                </div>
                <div className={"point slide " + (activeSpot === "about" ? "point-phone-view" : "")}  onClick={() => setActiveSpot(activeSpot === "about" ? "" : "about")}>
                    <span>À propos</span>
                    <div className="slide-content">
                        <div className="head">
                            <div className="head-title">
                                Création
                            </div>
                            <div className="content">
                                <div className="item-content">
                                    <span>Objectifs</span>
                                </div>
                                <div className="item-content">
                                    <span>Mentions légales</span>
                                </div>
                                <div className="item-content">
                                    <span>Naflouille Creations</span>
                                </div>
                            </div>
                        </div>
                        <div className="head">
                            <div className="head-title">
                                Développement
                            </div>
                            <div className="content">
                                <div className="item-content">
                                    <span>Code Source</span>
                                </div>
                                <div className="item-content">
                                    <span>Contribuer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"menu-view " + (view ? "view" : "")} onClick={() => {
                setView(!view);
                if (!view) {
                    setActiveSpot("");
                }
            }}>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
    )
};
HotBar.propTypes = {
    routes: PropTypes.array,
};
export default HotBar;