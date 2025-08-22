import {  useEffect, useState } from 'react'
import Button from './components/modules/button'

import '../public/styles/app.scss';
import '../public/styles/components/main/borgir.scss';
import '../public/styles/components/main/Menu.scss';
import '../public/styles/scripts/alert/SearchProject.scss'

import appStorage from './scripts/modules/main/storage-management/directory';
import TextEditor from './scripts/alert/display/text-editor';
import CreateNewProject from './scripts/alert/display/create-new-project';
import SearchBox from './scripts/alert/display/search-box';
import ProjectInformations from './scripts/alert/display/project-informations';
import ProjectUpdate from './scripts/alert/display/project-update';
import ProgressSection from './scripts/alert/display/progress-section';
import ProjectsDisplay from './components/projects-display';
import Help from './scripts/alert/display/utilitaries/help';
import Menu from './scripts/alert/display/menu';

function App() {
  const storage = appStorage.get();

  /*

    This app uses the fact that each "pages" of itself is actually a
    sort of "popup" appearing when a certain condition is set to true.
    So, each state of each "popup" is stored in a useState hook, and in the App.jsx
    file, for all the "popups" to be connected to each other, in order to be able to 
    call other popups when one is active. 

  */

  const [projectCreationComponentState, setProjectCreationComponentState] = useState(false);
  const [displayUpdatePopUp, setDisplayUpdatePopUp] = useState(null);

  const [informationsView, setInformationsView] = useState(false);
  const [viewProjectSelection,setViewProjectSelection] = useState(false);
  const [searchProjects, setSearchProjects] = useState([]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);


  const [viewSearchBoxState, setViewSearchBoxState] = useState(false);

  const [firstConnection, setFirstConnection] = useState(storage && (storage.firstConnection === undefined || storage.firstConnection === true) ? true : false);

  const [isPhone, setIsPhone] = useState(false);

  const [
    theme, setTheme
  ] = useState(storage && storage.theme ? storage.theme : "light");
  

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme]);
  

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsPhone(true);
    } else {
      setIsPhone(false);
    }
  }, [window.innerWidth])

    const [
        projectViewDisplay, setProjectViewDisplay
    ] = useState(false);
    const [
        project, setProject
    ] = useState("");



  return (
    <>
      <Menu
        setTheme={setTheme}
        theme={theme}
        setIsPhone={setIsPhone}
        isPhone={isPhone}
        setViewSearchBoxState={setViewSearchBoxState}
        setProjectCreationComponentState={setProjectCreationComponentState}
        setInformationsView={setInformationsView}
        setFirstConnection={setFirstConnection}
        setSelectedProject={setSelectedProject}
        setViewProjectSelection={setViewProjectSelection}
      />

      <Help
        setFirstConnection={setFirstConnection}
        firstConnection={firstConnection}
        setProjectCreationComponentState={setProjectCreationComponentState}
        setInformationsView={setInformationsView}
      />
      {projectCreationComponentState && (
        <CreateNewProject
          setState={setProjectCreationComponentState}
          update={false}
        />
      )}

      {viewSearchBoxState && (
        <SearchBox
          setViewSearchBoxState={setViewSearchBoxState}
          viewSearchBoxState={viewSearchBoxState}
          searchProjects={searchProjects}
          setDisplayUpdatePopUp={setDisplayUpdatePopUp}
          setSearchProjects={setSearchProjects}
        />
      )}

      <div className="right-content">
        <ProjectsDisplay
          setDisplayUpdatePopUp={setDisplayUpdatePopUp}
          setProject={setProject}
          setViewProjectSelection={setViewProjectSelection}
          setSelectedProject={setSelectedProject}
          setDisplay={setProjectViewDisplay}
          project={project}
        />


      </div>

      {informationsView && (
        <ProjectInformations
          setInformationsView={setInformationsView}
        />
      )}

      {displayUpdatePopUp && <ProjectUpdate
        setState={setDisplayUpdatePopUp}
        project={displayUpdatePopUp}
      />}

      {viewProjectSelection && <TextEditor
        setDisplay={setViewProjectSelection}
        setShowAlert={setProjectCreationComponentState}
        setSelectedProject={setSelectedProject}
        setSelectedChapter={setSelectedChapter}
        selectedChapter={selectedChapter}
        selectedProject={selectedProject}
      />}


      {projectViewDisplay && project != "" &&
          <ProgressSection
            setProject={setProject}
            project={project}
            setDisplay={setProjectViewDisplay}
            setDisplayUpdatePopUp={setDisplayUpdatePopUp}
          />
      }

      
    </>
  )
}

export default App
