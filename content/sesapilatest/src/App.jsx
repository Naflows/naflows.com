import PropTypes from 'prop-types';
import '../public/styling/root/index.css'
import '../public/styling/modules/index.css'
import MainRendering from './main/index';
import appSvg from '../public/modules/utilities/svg';
import './index.css';
import { popup } from '../public/modules/utilities/popup';
import { storage } from '../editor/edit/src/storage/access';
import app from '../app';
import { Link, Route, Routes } from 'react-router-dom';
import AboutApp from '../about/src/App';
import EditorApp from '../editor/edit/src/app';



export const InfoBar = ({active}) => {
  const sectionItems = [
    { n : "Drive" , l : '/'},
    { n : "About" , l : '/about/'},
  ]

  return (
    <div className="info-bar">
      <div className="logotype">
        {appSvg.new('logotype')}
      </div>
      <div className="sections">
        {
          sectionItems.map((e,i) => (
            <Link to={e.l} style={{textDecoration:"none"}} key={i}>
              <div className={"item " +( e.n == active ? 'in' : '')} key={i}>
                  <div className="text">
                    {e.n}
                  </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
};
InfoBar.propTypes = {
  active : PropTypes.string.isRequired
}

export const Version = () => {
  const BetaOpen = () => {
    popup.new(
      {
        title : 'About SesAPI',
        description : 'SesAPI is a tool designed for Starblast players of any type. From pros to starters, write or read articles to improve yourself in any way.\nFor more informations, please join the Discord Server or read the blog post.\nThis tool is experimental and is subject to changes and improvements.',
        customEndMessage : 'Close'
      },
      [
        {
          type  : 'filled',
          container : {text:"Discord Server"},
          action : function() {
            window.open('https://discord.gg/hXsrvCjDmF');
          }
        }, 
        {
          type  : 'filled',
          container : {text:"Blog post"},
          action : function() {
            window.open('');
          }
        }, 
      ]
    )
  }

  return (
    <div className="app-details bottom">
      <div className="app">
        <div className="status">
          {app.details.status}
        </div>
        <div className="version">
          Version {app.details.version}
        </div>
      </div>
      <div className="beta-message">
        <div className="text">
          <p>SesAPI is currently in <a onClick={() => BetaOpen()}>beta</a>.</p>
          <p>Make sure to report any major problems.</p>
        </div>
      </div>
    </div>
  )
}  



function App() {
  if (!storage.access()) storage.set({});

  if (!storage.access("SesAPIParameters")) storage.set({
      preferedDisplay : "grid"
  }, "SesAPIParameters" );


  return (
    <>
      <Routes>
        <Route path="*" element={<MainRendering />}/>
        <Route path="/about" element={<AboutApp />} />
        <Route path="/editor/edit" element={<EditorApp />} />
      </Routes>
      <div className="popup-container-dnd"></div>
      <Version />
    </>
  )
}

export default App
