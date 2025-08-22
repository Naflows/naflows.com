import React, { useEffect, useState } from 'react'
import AlgusClassDirector from '../Algorithm/index.js'
import RoutesSelection from './components/routesSelection.jsx';
import CalendarBody from './components/calendar/body.jsx';
import Loader from './components/loader.jsx';



function App() {
  const [searchRoute, setSearchRoute] = useState('');
  const [route, setRoute] = useState({});
  const [routes, setRoutes] = useState([]);
  const [algus, setAlgus] = useState();


  useEffect(() => {
      const algusClassDirector = new AlgusClassDirector({
          preciseSearch : true,
          printMethods : false,
          name : "Algus V.1",
          instanceList : ["calendar_dates","calendar","routes","trips","shapes","stop_times","stops"]
      });

      algusClassDirector.getRoutes((list) => {
          setRoutes(list);
      })

      setAlgus(algusClassDirector);

  }, [])

  return (
    <>
      <div className="search">
        <div className='routes-choice'>
          <span>Sélectionnez une ligne</span>
          <RoutesSelection routes={routes} algus={algus} setRoute={setRoute} />
        </div>
        <CalendarBody route={route}/>
      </div>
      <div className="product-credits">
        <span>Produit par Naflouille Creations.</span>
        <a href="https://albi-bus.naflouille-creations.com/about/">En savoir plus</a>
      </div>
      <Loader />
    </>
  )
}

export default App
