import PropTypes from 'prop-types';

const Results = ({
    searchProjects,
    setViewSearchBoxState,
    setDisplayUpdatePopUp
}) => {
    if (searchProjects.length > 0) {
        return (
            <div className='search-results'>
                {searchProjects.map((p, index) => (
                    <div
                        key={index}
                        className="search-result"
                        onClick={() => {
                            setViewSearchBoxState(false);
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
        )
    }
};

Results.propTypes = {
    searchProjects: PropTypes.array.isRequired,
    setViewSearchBoxState: PropTypes.func.isRequired,
    setDisplayUpdatePopUp: PropTypes.func.isRequired
};

export default Results;