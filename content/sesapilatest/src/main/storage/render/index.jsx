
import PropTypes from 'prop-types';
import ArticleSmallView from './homeRender';
import './style/index.css';
import ResultToolBar from './components/toolbar';
import { storage } from '../../../../editor/edit/src/storage/access';

// Cut each 10 content
const cut = 10;

const StorageRender = ( { s, storageDisplay } ) => {
    console.log(s)
    if (!s) s = []
    const initialCut = cut * (storageDisplay - 1);
    const cutStorage = s.slice(initialCut, cut + storageDisplay);
    console.log(s , "storage", cutStorage)
    return (
        <>
            <ResultToolBar />
            <div className={"storage-render" + " " + storage.access('SesAPIParameters').preferedDisplay}>
                {
                    cutStorage.map((value,a) => {
                        return <ArticleSmallView article={value} key={a}/>
                    })
                }
                {
                    s.length == 0 ? (
                        <img src={"https://media.discordapp.net/attachments/951567105596207169/1185681369121177611/Nothing.png?ex=65907ed3&is=657e09d3&hm=5c4c702ba8a1c450bba448c616a3791ff90f064e8310808a3ff2499bcbbb152c&=&format=webp&quality=lossless&width=2371&height=733"} style={{
                            position:'absolute', height: '10%',
                            opacity: 0.5,
                            top:0,bottom:0,left:0,right:0,margin:'auto'
                        }}/>
                    ) : null
                }
            </div>
        </>
    )
};
StorageRender.propTypes = {
    s : PropTypes.array.isRequired,
};

export default StorageRender;