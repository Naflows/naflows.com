import PropTypes from 'prop-types';
import cancel from './WhereCancelButtonIs';
import Alert from '../../components/main/alert';

const DisplayViewSearch = ({ setViewSearch, searchProjects, findProjects, searchInputRef, setDisplayUpdatePopUp }) => {


    return (
        <Alert
            setState={setViewSearch}
            title="Rechercher un projet"
            message="Rechercher un projet par nom"
            additional_content={[
                <div className='field' key={0} id="resultsField">
                    <div className="search-input" id={searchProjects.length === 0 ? "" : "searchInputResults"}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                        <input
                            ref={searchInputRef}
                            autoComplete='off'
                            onInput={findProjects}
                            id="searchInput"
                            type="text"
                            placeholder="Rechercher un projet"
                        />
                    </div>
                    {searchProjects.length > 0 && (
                        <div className='search-results'>
                            {searchProjects.map((p, index) => (
                                <div
                                    key={index}
                                    className="search-result"
                                    onClick={() => {
                                        setViewSearch(false);
                                        setDisplayUpdatePopUp(p);
                                    }}
                                >
                                    <div className="image">
                                        <img src={p.image} alt="project" />
                                    </div>
                                    <div className="main-informations">
                                        <div className="name">{p.name}</div>
                                        <div className="words">
                                            <div className="written">
                                                {p.stats.total} / {p.length}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ]}
            buttons={[
                cancel(setViewSearch, false)
            ]}
        />
    );
};

DisplayViewSearch.propTypes = {
    setViewSearch: PropTypes.func.isRequired,
    searchProjects: PropTypes.array.isRequired,
    findProjects: PropTypes.func.isRequired,
    searchInputRef: PropTypes.object.isRequired,
    setDisplayUpdatePopUp: PropTypes.func.isRequired
};

export default DisplayViewSearch;