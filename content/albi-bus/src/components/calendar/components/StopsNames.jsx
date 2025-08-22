import PropTypes from "prop-types";
import BoldImportantLetters from "../../../modules/BoldImportantLetters";

const DisplayStopsName = ({
    nearestPoint,
    stopsNames,
    namesSort,
    setNamesSort
}) => {
    if (stopsNames) {
        return (
            <div className="stops-names">
                <span>Trier par nom d&rsquo;arrêt</span>
                <div className="content">
                    {stopsNames.map((item, index) => (
                        <div
                            className={`name ${namesSort.includes(item) ? "active" : ""}`}
                            key={index}
                            onClick={() => {
                                const isItemInSort = namesSort.includes(item);
                                if (!isItemInSort) {
                                    setNamesSort([...namesSort, item]);
                                } else {
                                    setNamesSort(namesSort.filter((name) => name !== item));
                                }
                            }}
                        >
                            {item.stop_name == nearestPoint.stop_name ? (
                                <svg width="86" height="117" viewBox="0 0 86 117" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M29.8697 1.93623C3.67277 10.1228 -8.02825 40.6087 5.96393 64.2206L33.9541 111.454C37.8273 117.99 47.2868 117.99 51.16 111.454L79.1501 64.2206C93.1423 40.6087 81.4413 10.1228 55.2444 1.93623C46.9831 -0.645409 38.1309 -0.645409 29.8697 1.93623ZM42.557 20.9714C37.0342 20.9714 32.557 25.4486 32.557 30.9714C32.557 36.4943 37.0342 40.9714 42.557 40.9714C48.0799 40.9714 52.557 36.4943 52.557 30.9714C52.557 25.4486 48.0799 20.9714 42.557 20.9714Z" fill="#D9D9D9"/>
                                </svg>
                            ) : null}
                            <BoldImportantLetters sentence={item.stop_name} />
                        </div>  
                    ))}
                </div>
            </div>
        )
    }
};

DisplayStopsName.propTypes = {
    nearestPoint: PropTypes.object.isRequired,
    stopsNames: PropTypes.array.isRequired,
    namesSort: PropTypes.array.isRequired,
    setNamesSort : PropTypes.func.isRequired
};


export default DisplayStopsName;