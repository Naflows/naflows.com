import PropTypes from 'prop-types';
import cancel from '../../WhereCancelButtonIs.jsx';
import Alert from '../../../../components/main/alert/index.jsx';
import localstorage_name from '../../../../main.jsx';
import findProjects from '../../../modules/main/projects/find-projects-from-search.js';
import { useEffect, useRef } from 'react';
import Results from './components/results.jsx';

const SearchBox = ({ 
    setViewSearchBoxState, 
    searchProjects, 
    setDisplayUpdatePopUp,
    setSearchProjects,
    viewSearchBoxState
}) => {
    const ref = useRef(null);
    useEffect(() => {
        if (viewSearchBoxState) {
            ref.current.focus();
        }
    }, [viewSearchBoxState])

    return (
        <Alert
            setState={setViewSearchBoxState}
            title="Rechercher un projet"
            additional_content={[
                <div className='field' key={0} id="resultsField">
                    <div className="search-input" id={searchProjects.length === 0 ? "" : "searchInputResults"}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                        <input
                            ref={ref}
                            autoComplete='off'
                            onInput={() => {
                                findProjects(localstorage_name, setSearchProjects);
                            }}
                            id="searchInput"
                            type="text"
                            placeholder="Rechercher un projet"
                        />
                    </div>
                    <Results
                        searchProjects={searchProjects}
                        setViewSearchBoxState={setViewSearchBoxState}
                        setDisplayUpdatePopUp={setDisplayUpdatePopUp}
                    />
                </div>
            ]}
            buttons={[
                cancel(setViewSearchBoxState, false)
            ]}
        />
    );
};

SearchBox.propTypes = {
    setViewSearchBoxState: PropTypes.func.isRequired,
    searchProjects: PropTypes.array.isRequired,
    findProjects: PropTypes.func.isRequired,
    setDisplayUpdatePopUp: PropTypes.func.isRequired,
    setSearchProjects: PropTypes.func.isRequired,
    viewSearchBoxState: PropTypes.bool.isRequired
};

export default SearchBox;