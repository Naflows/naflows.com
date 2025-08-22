import PropTypes from "prop-types";



const BoldImportantLetters = ({sentence}) => {
    const content = [];

    const words = sentence.split(" ");

    const step = 3;    

    words.forEach((word, index) => {
        const c = [];
        for (let i = 0; i < word.length; i++) {
            if (i % step === 0) {
                c.push(<span className="bold" key={`${i}-${index}`}>{word[i]}</span>);
            } else {
                c.push(<span className="unbold">{word[i]}</span>);
            }
        }
        content.push(<span key={index}>{c}</span>);
    });

    return content;
};


BoldImportantLetters.propTypes = {
    sentence : PropTypes.string.isRequired,
}


export default BoldImportantLetters;