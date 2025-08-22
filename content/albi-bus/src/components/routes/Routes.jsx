import PropTypes from 'prop-types';
import { FindInObject } from '../../App';
import Itinerary from './itinerary';

const Line = ({ route, agency, index }) => {
    return (
      <div className="route" id={route.route_id} style={{animationDelay : index*0.5 + "s"}}>
        <div className="route-important">
          <div className="route-shortname" style={{backgroundColor:"#" + route.route_color, color:"#" + route.route_text_color}}>{route.route_short_name}</div>
          <div className="route-informations">
            <div className="nameDesc">
              <div className="route-name">{route.route_long_name}</div>
              <div className="agency-name">Par {agency ? agency.agency_name : 'Agence inconnue'}</div>
            </div>
          </div>
        </div>
        <div className="price-info">
          <div className="price">
            1€30
          </div>
          <div className="big-slash"></div>
          <div className="price-terms">
            <span>Par trajet</span>
            <span>Valable sur toute ligne pendant 1h</span>
          </div>
        </div>
        <Itinerary route={route}/>
      </div>
    );
  };



const Routes = ({routes, agencies}) => {
    if (routes.length > 0) {
        return (
            routes.map((route, index) => (
                <Line
                  route={route}
                  key={index}
                  index={index}
                  agency={FindInObject(agencies, "agency_id", route.agency_id)}
                />
            ))
        )
    }
    return (
      <div className="no-result">
        Aucune ligne n'a été trouvée. Une erreur est probablement arrivée.
      </div>
    );
};

Routes.propTypes = {
    routes: PropTypes.array,
    agencies : PropTypes.array
};

export default Routes;