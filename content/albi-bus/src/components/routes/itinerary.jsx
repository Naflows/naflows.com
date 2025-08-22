import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import get from '../../mods/query/get';
import { FindInObject } from '../../App';

function MainTrips(route, trips) {
  const RouteTrips = [];
  for (const t in trips) {
    const trip = trips[t];
    if (trip.route_id == route.route_id && FindInObject(RouteTrips, "trip_headsign", trip.trip_headsign) == null) {
      RouteTrips.push(trip);
    }
  }
  return RouteTrips;
}

function arraysHaveSameValues(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every(value => array2.includes(value));
}

let TripsDone = {};


function AllTrips(main, trips) {
  const routeNames = main.map((item) => item.trip_headsign);
  const routeString = routeNames.join(" => ");
  console.log(`Les arrêts de cette ligne sont: ${routeNames.join(" => ")}`)
  let RouteTrips = [];

  if (!TripsDone[routeString]) {
    const TripsKeys = Object.keys(TripsDone);
    const NameFound = [];
    let i;

    if (TripsKeys.length == 0) i = 0;
    else i = TripsDone[TripsKeys[TripsKeys.length - 1]].lastIndexChecked - 1;

    let consecutiveMatches = 0;
    console.log(`Démarrage à l'index ${i}`)
    while (i < trips.length && consecutiveMatches < routeNames.length && !arraysHaveSameValues(NameFound, routeNames)) {
      const trip = trips[i];
      if (FindInObject(RouteTrips, "stop_name", trip.stop_name) === null) {
        RouteTrips.push(trip);
        consecutiveMatches = routeNames.includes(trip.stop_name) ? consecutiveMatches + 1 : 0;
        if (routeNames.includes(trip.stop_name)) NameFound.push(trip.stop_name);
      }
      i++;
    }
    TripsDone[routeString] = {
      list : RouteTrips,
      lastIndexChecked : i
    }
  } else {
    RouteTrips = TripsDone[routeString].list;
  }
  console.log(RouteTrips, TripsDone)
  return RouteTrips;



}


const Itinerary = ({ route }) => {
  const [it, setIt] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [wholeTrip, setWholeTrip] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const trips = await get("trips");
        const allTrips = await get("stops");

        const RouteTrips = MainTrips(route, trips);
        //console.log(`Itinéraire pour ${route.route_long_name}`);
        const LastTrip = AllTrips(RouteTrips, allTrips);
        setWholeTrip(LastTrip);
        setIt(RouteTrips);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [route]); 

  return (
    <>
      <div className="trip-dest">
        {it && !viewAll ? (
          <>
            {it.map((item, index) => (
              <div key={item.trip_id} className="headsign" style={{animationDelay: (index*0.3)+"s"}}>
                <div className="dot"></div>
                <div className="name">
                  {item.trip_headsign}
                </div>
              </div>
            ))}
            <div className="line"></div>
          </>
        ) : (
          wholeTrip && viewAll ? (
            <>
              {wholeTrip.map((item, index) => (
                <div key={item.stop_id} className="headsign" style={{animationDelay: (index*0.3)+"s"}}>
                  <div className="dot"></div>
                  <div className='position' target='_blank' onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${item.stop_lat},${item.stop_lon}`)}>
                    <svg width="86" height="117" viewBox="0 0 86 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M30.3127 1.96479C4.11573 10.1513 -7.58529 40.6373 6.40689 64.2491L34.3971 111.483C38.2703 118.019 47.7298 118.019 51.6029 111.483L79.5931 64.2491C93.5853 40.6373 81.8843 10.1513 55.6873 1.96479C47.4261 -0.616843 38.5739 -0.616842 30.3127 1.96479ZM43 21C37.4772 21 33 25.4772 33 31C33 36.5228 37.4772 41 43 41C48.5229 41 53 36.5228 53 31C53 25.4772 48.5229 21 43 21Z" fill="#D9D9D9"/>
                    </svg>
                    <div className="name">
                      {item.stop_name}
                    </div>
                  </div>
                </div>
              ))}
              <div className="line"></div>
            </>
          ) : null
        )}
      </div>
      <div className="more" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? <LessStops /> : <MoreStops />}
      </div>
    </>
  );
}


const MoreStops = () => {
  return (
    <>
      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="54" width="20" height="128" rx="10" fill="#D9D9D9" />
        <rect y="74" width="20" height="128" rx="10" transform="rotate(-90 0 74)" fill="#D9D9D9" />
      </svg>
      <span>Voir tous les arrêts</span>
    </>
  )
}

const LessStops = () => {
  return (
    <>
      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="74" width="20" height="128" rx="10" transform="rotate(-90 0 74)" fill="#D9D9D9"/>
      </svg>
      <span>Voir seulement les arrêts principaux</span>
    </>
  )
}

Itinerary.propTypes = {
  route: PropTypes.object.isRequired
};

export default Itinerary;
