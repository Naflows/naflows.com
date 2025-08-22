import PropTypes from 'prop-types';

const MissingWords = ({
    words, length
}) => {
    
    const nb_without_rd = Math.round((words)*100/length);
    const rd = nb_without_rd.toFixed(2);
    let nb = rd;
    if (nb == nb_without_rd) nb = nb_without_rd

    return (
        <>
            <div className="boxes-cube-big">
                <div className="box cube" id="missing-words">
                    <div className="main">
                        {(length - words)}
                    </div>
                    <div className="sub-text">
                        sur {length}
                    </div>
                    <div className="text">
                        mots restants
                    </div>
                </div>
                <div className="box cube">
                    <div className="main">
                        {nb}%
                    </div>
                    <div className="text">
                        accomplis
                    </div>
                    <div className="sub-text">
                        Soit {words} mot{length - words > 1 ? "s" : ""} écrit{length - words > 1 ? "s" : ""} 
                    </div>
                </div>
            </div>
        </>
    );
};

MissingWords.propTypes = { 
    words: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired
};

export default MissingWords;