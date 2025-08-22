import PropTypes from 'prop-types';


const NearestPoint = ({nearest}) => {
    console.log(nearest, "is nearest")
        return (
            <div className="nearest-point route-info">
                <span>
                    {nearest.stop_name ? (
                        <>
                            <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M90 113H111V123C111 125.761 108.761 128 106 128H95C92.2386 128 90 125.761 90 123V113Z" fill="#D9D9D9"/>
                                <path d="M20 113H39V123C39 125.761 36.7614 128 34 128H25C22.2386 128 20 125.761 20 123V113Z" fill="#D9D9D9"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.53198 10C9.53198 4.47716 14.0091 0 19.532 0H108.468C113.991 0 118.468 4.47715 118.468 10V111.364C118.468 114.125 116.23 116.364 113.468 116.364H14.532C11.7706 116.364 9.53198 114.125 9.53198 111.364V10ZM85.7872 89.7176C85.7872 85.9574 88.8354 82.9091 92.5957 82.9091C96.3559 82.9091 99.4042 85.9574 99.4042 89.7176V90.646C99.4042 94.4063 96.3559 97.4545 92.5957 97.4545C88.8354 97.4545 85.7872 94.4063 85.7872 90.646V89.7176ZM35.4042 82.9091C31.644 82.9091 28.5957 85.9574 28.5957 89.7176V90.646C28.5957 94.4063 31.644 97.4545 35.4042 97.4545C39.1645 97.4545 42.2127 94.4063 42.2127 90.646V89.7176C42.2127 85.9574 39.1645 82.9091 35.4042 82.9091ZM14.9788 25.2727C14.9788 24.1682 15.8742 23.2727 16.9788 23.2727H111.021C112.126 23.2727 113.021 24.1682 113.021 25.2727V66.3636C113.021 67.4682 112.126 68.3636 111.021 68.3636H16.9788C15.8742 68.3636 14.9788 67.4682 14.9788 66.3636V25.2727ZM31.5978 8.72726C29.1878 8.72726 27.2341 10.6809 27.2341 13.0909C27.2341 15.5009 29.1878 17.4545 31.5978 17.4545H97.7641C100.174 17.4545 102.128 15.5009 102.128 13.0909C102.128 10.6809 100.174 8.72726 97.7641 8.72726H31.5978Z" fill="#D9D9D9"/>
                                <path d="M1 36C1 33.2386 3.23858 31 6 31H10V58H6C3.23858 58 1 55.7614 1 53V36Z" fill="#D9D9D9"/>
                                <path d="M118 31H122C124.761 31 127 33.2386 127 36V53C127 55.7614 124.761 58 122 58H118V31Z" fill="#D9D9D9"/>
                            </svg>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${nearest.stop_lat},${nearest.stop_lon}`}>
                                {nearest.stop_name}
                            </a>
                            est proche
                        </>
                    ) : (
                        <>
                            <span className='colorful' onClick={() => navigator.geolocation.getCurrentPosition(
                                () => {
                                    window.location.reload();
                                }
                            )}>Activez la géolocalisation</span><span>pour les fonctionnalités intelligentes</span>
                        </>
                    )}
                </span>
            </div>
        )
};

NearestPoint.propTypes = {
    nearest: PropTypes.object,
};

export default NearestPoint;