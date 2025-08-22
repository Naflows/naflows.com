import '../../public/styling/root/index.css'
import '../../public/styling/modules/index.css'
import '../../src/index.css';
import { InfoBar, Version } from '../../src/App';
import MainAboutPage from './components/main';



function AboutApp() {
  
  return (
    <>
      <InfoBar active={"About"}/>
      <MainAboutPage />
      <div className="popup-container-dnd"></div>
    </>
  )
}

export default AboutApp;
