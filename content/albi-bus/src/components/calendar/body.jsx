import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { v1 as uuid } from "uuid";
import FindNearest from "../../location/nearest";
import StopTimes from "./components/StopTimes";
import loader from "../../modules/loader";

import '../../../public/styles/components/calendar/calendar-header.scss';
import '../../../public/styles/components/calendar/route-calendar.scss';
import '../../../public/styles/components/calendar/index.scss';
import DisplayStopsName from "./components/StopsNames";
import BoldImportantLetters from "../../modules/BoldImportantLetters";



function CalendarBody({ route }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const [usableRoute, setUsableRoute] = useState(null);
    const [calendar, setCalendar] = useState();
    const [nearestPoint, setNearestPoint] = useState(null);

    const [stopsNames, setStopsNames] = useState([]);
    const [namesSort, setNamesSort] = useState([]);

    const initialRoute = route;


    
    useEffect(() => {
        async function GetLocation(l) {

            await FindNearest(l, (item) => {
                setNearestPoint(item);
                loader.disable();

            });

        }

    
        if (route.route && usableRoute) {

            const newTrips = activeIndex !== 2 ? usableRoute.trips.filter(trip => parseInt(trip.direction_id) === activeIndex) : usableRoute.trips;
    
            const newStopTimes = route.stopTimes.filter(stopTime => newTrips.some(trip => trip.trip_id === stopTime.trip_id));
            const newStops = route.stops.filter(stop => newStopTimes.some(stopTime => stopTime.stop_id === stop.stop_id));
    
            setUsableRoute(prevRoute => ({
                ...prevRoute,
                trips: newTrips,
                stopTimes: newStopTimes,
                stops: newStops
            }));
            GetLocation(usableRoute.stops);
            setNamesSort([]);
        }
    }, [activeIndex, route]);
    
    useEffect(() => {
        if (usableRoute && nearestPoint && usableRoute.stopTimes) {
            CalendarDisplay(nearestPoint);
        }
    }, [usableRoute, nearestPoint, namesSort, activeIndex]);

    useEffect(() => {
        setActiveIndex(null);
    }, [route]);

    const FormatDate = (date) => {
        return date.substr(0, date.length - 3);
    };

    const CalendarDisplay = ( nearestPoint ) => {
        let calendar = [];
    
        calendar.push(
            <div className="time description" key="description">
                <div className="times">
                    <div className="times-container">
                        <div className="times-time">
                            Arrivée
                        </div>
                        <div className="times-time">
                            Départ
                        </div>
                    </div>
                    <div className="time-left view">
                        Temps d&apos;arrêt
                    </div>
                </div>
                <div className="stop">
                    Arrêt
                </div>
            </div>
        );
        let updatedStopTimes = [];
        let updatedStopsNames = [];


        if (usableRoute.stopTimes[0]) {
            let lastTripID = usableRoute.stopTimes[0].trip_id;
            let starter = usableRoute.stopTimes[0];
            let headLine = [];
            let headLineContent = [];
            usableRoute.stopTimes.forEach((stopTime) => {
                const stop = usableRoute.stops.find((stop) => stop.stop_id == stopTime.stop_id);

                const departureTimeInSeconds = getTimeInSeconds(stopTime.departure_time);
                const arrivalTimeInSeconds = getTimeInSeconds(stopTime.arrival_time);
                
                const stayTimeInSeconds = departureTimeInSeconds - arrivalTimeInSeconds;
                
                // Function to convert time string (HH:MM:SS) to seconds
                function getTimeInSeconds(timeStr) {
                    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
                    return hours * 3600 + minutes * 60 + seconds;
                }
        
                const hours = Math.floor(stayTimeInSeconds / 3600);
                const minutes = Math.floor((stayTimeInSeconds % 3600) / 60);
                const seconds = stayTimeInSeconds % 60;
        
                const stayTime = `${hours > 0 ? hours + " h" + (hours > 1 ? "s" : "") : ""} ` +
                    `${minutes > 0 ? minutes + " mn" + (minutes > 1 ? "s" : "") : ""} ` +
                    `${seconds > 0 ? seconds + " s" + (seconds > 1 ? "s" : "") : ""}`;
        
                const isActive = nearestPoint && nearestPoint.stop_name === stop.stop_name;
        

                let content = (
                    <div className={
                        `time ${isActive ? "active" : ""}`
                    } key={stopTime.stop_sequence + stop.stop_id + uuid()} id={stopTime.stop_name}>
                        <div className="times">
                            <div className="times-container">
                                <div className="times-time">
                                    {FormatDate(stopTime.arrival_time)}
                                </div>
                                <div className="times-time">
                                    {FormatDate(stopTime.departure_time)}
                                </div>
                            </div>
                            <div className={`time-left ${hours == 0 && minutes == 0 && seconds == 0 ? "" : "view"}`}>
                                {stayTime}
                            </div>
                        </div>
                        <div className="stop">
                            <BoldImportantLetters sentence={stop.stop_name}/>
                        </div>
                    </div>
                );

                if (namesSort.length > 0 && namesSort.find((i) => i.stop_name == stop.stop_name) || namesSort.length === 0) {
                    headLine.push(content);
                    headLineContent.push(stop.stop_name);
                }

                if (!updatedStopsNames.find((s) => s.stop_name == stop.stop_name)) {
                    updatedStopsNames.push(stop);   
                }
        
                if (stopTime.trip_id !== lastTripID) {


                    lastTripID = stopTime.trip_id;
                    updatedStopTimes.push({start: starter, end: stopTime});

                    const s = FormatDate(starter.departure_time).toString();
                    const a = FormatDate(stopTime.arrival_time).toString();
                    const headID = uuid();

                    starter = stopTime;
                    if (headLine.length > 0) {
                        calendar.push(<StopTimes  s={s} a={a} headID={headID} headLine={headLine}/>);
                    }
                    headLine = []
                    headLineContent = []

                    if (namesSort.length == 0) {
                        calendar.push(
                            <div className="separator" key={`separator-${stopTime.stop_sequence}-${uuid()}`} />
                        );
                    }
                }
            });
        }
    
        setCalendar(calendar);
        setStopsNames(updatedStopsNames);

    };



    if (route.route) {
        const p = ["left","middle","right"];
        return (
            <div className="route-calendar">
                <div className="calendar-header">
                    <div className="route-name">
                        <div className="route-short-name" style={{
                            backgroundColor: "#" + route.route.route_color,
                            color : "#" + route.route.route_text_color
                        }}>
                            {route.route.route_short_name}
                        </div>
                        <div className="route-long-name">
                            {route.route.route_long_name}
                        </div>
                    </div>
                    <div className={"calendar-direction " + (activeIndex != null ? p[activeIndex] : "")}>
                        {["Aller en centre-ville","Aller en périphérie","Tout voir"].map((l,i) => (
                            <div key={i} className="option" onClick={() => {
                                loader.enable()
                                if (i != activeIndex) {
                                    setUsableRoute(initialRoute);
                                    setActiveIndex(i);
                                }
                            }}>
                                {l}
                            </div>
                        ))}
                    </div>
                    {
                        stopsNames.length > 0 ? <DisplayStopsName
                            nearestPoint={nearestPoint}
                            stopsNames={stopsNames}
                            namesSort={namesSort}
                            setNamesSort={setNamesSort}
                        /> : null
                    }
                </div>
                {
                    usableRoute && calendar && usableRoute.stopTimes[0] ? (
                        <div id="calendar-container" className="calendar">
                            {calendar}
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

CalendarBody.propTypes = {
    route: PropTypes.object.isRequired,
};

export default CalendarBody;
