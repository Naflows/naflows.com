import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Alert from '../../../components/main/alert';

import '../../../../public/styles/scripts/alert/DisplayAdvancements.scss';
import State1 from '../canvasView/State1';
import State2 from '../canvasView/State2';
import MainInformations from '../advancementsModules/main/MainInformations';
import SessionsTime from '../advancementsModules/main/SessionsTime';
import State3 from '../canvasView/State3';
import WordsEvolution from '../advancementsModules/main/WordsEvolution';
import Button from '../../../components/modules/button';

const charts = {
    wordsProgress : function(canvas, project) {
        State1(canvas, project);
    },
    sessionsTimes : function(canvas, project,setCanvasTimesHoverValues, canvasTimeType) {
        State2(canvas, project,setCanvasTimesHoverValues, canvasTimeType );
    },
    wordsChart : function(canvas, project, setCanvasWordsHoverValues, canvasWordsType) {
        State3(canvas, project, setCanvasWordsHoverValues,canvasWordsType);
    }
}


const ProgressSection = ({
    setProject, project, setDisplay,setDisplayUpdatePopUp
}) => {

    const [mostFeltMood, setMostFeltMood] = useState(-1);
    const [sessions, setSessions] = useState({});
    const [wordsWrittenToday, setWordsWrittenToday] = useState(0);
    const [
        canvasTimesHoverValues, setCanvasTimesHoverValues
    ] = useState({});
    const [
        canvasWordsHoverValues, setCanvasWordsHoverValues
    ] = useState({});
    const [
        canvasWordsType, setCanvasWordsType
    ] = useState("bars");
    const [
        canvasTimesType, setCanvasTimesType
    ] = useState("bars")


    useEffect(() => {
        if (project) {
            const moodsList = [];
            project.stats.sessions.forEach((i) => {
                const _ = moodsList.find((m) => m.id === i.mood);
                if (!_) {
                    moodsList.push({id:i.mood, nb : 1});
                } else {
                    _.nb++;
                    moodsList[moodsList.indexOf(_)] = _; 
                }
            });
    
            moodsList.sort((a,b) => b.nb - a.nb);
            console.log(moodsList)
            if (moodsList.length >= 1) {
                setMostFeltMood(moodsList[0].id);
            }
        }
    }, [project, mostFeltMood])

    useEffect(() => {
        if (project) {
            const canvas_wordsAdvancements = document.getElementById('words_advancements');
            const canvas_sessionsTimes = document.getElementById('sessions_time');
            const canvas_wordsChart = document.getElementById('words_chart_advancements');

            charts.wordsProgress(canvas_wordsAdvancements,project);
            charts.sessionsTimes(canvas_sessionsTimes, project,setCanvasTimesHoverValues, canvasTimesType);
            charts.wordsChart(canvas_wordsChart, project, setCanvasWordsHoverValues, canvasWordsType);
            console.log(canvasWordsType)

            const sessionNumber = project.stats.sessions.length;
            setSessions({
                number : sessionNumber,
                length : project.length,
                ratio : project.stats.total / sessionNumber
            })
        }
    }, [project, canvasWordsType, canvasTimesType])


    useEffect(() => {
        if (project) {
            const today = new Date();
            const words = project.stats.sessions.filter((i) => {
                const date = new Date(i.date);
                return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
            }).reduce((acc, i) => acc + i.words, 0);
            setWordsWrittenToday(words);
        }
    }, [project])

    

    return (
        <Alert
            title={`Progression de ${project.name}`}
            message={wordsWrittenToday === 0 ? "Vous n'avez encore rien écrit aujourd'hui !" : `Vous avez écrit ${wordsWrittenToday} mots aujourd'hui !`}
            className="big align-center"
            closeAtTop={true}
            closeFunction = {() => {
                setProject("");
                setDisplay(false);
            }}
            headerImageSrc = {project.image}
            additional_content={[
                <div className='display-row top-actions-buttons' style={{
                    marginTop: "5px"
                }} key={5}>
                    <Button
                        onClick={() => {
                            setDisplayUpdatePopUp(project);
                            setDisplay(false);
                        }}
                        text="Mettre à jour le projet"
                        className="primary"
                    />
                    {
                        project.stats.total > 0 ? (
                            <Button
                                onClick={() => {
                                    setDisplay(false);
                                    setProject("");
                                }}
                                text="Partager mes progrès"
                                className="secondary"
                            />
                        ) : null
                    }
                </div>,
                    project.stats.total > 0 ? (
                        <div className="global" key={1}>
                            <MainInformations
                                mostFeltMood={mostFeltMood}
                                sessions={sessions}
                                project={project}
                            />
                            <SessionsTime
                                canvasTimesHoverValues={canvasTimesHoverValues}
                                setCanvasTimesType={setCanvasTimesType}
                                canvasTimesType={canvasTimesType}
                            />
                            <WordsEvolution
                                canvasWordsHoverValues={canvasWordsHoverValues}
                                setCanvasWordsType={setCanvasWordsType}
                                canvasWordsType={canvasWordsType}
                            />
                        </div>
                    ) : (
                        <div className="no-words">
                            <div className="main">
                                Vous n&apos;avez pas encore écrit pour ce projet !
                            </div>
                            <div className="sub-main">
                                Mettez à jour votre projet pour commencer à suivre votre progression.
                            </div>
                        </div>
                    )
                ,
                <div className="space" key={4} style={{
                    marginTop: "10px"
                }}></div>
            ]}
        />
    );
};

ProgressSection.propTypes = {
    setProject: PropTypes.func,
    project: PropTypes.object,
    setDisplay: PropTypes.func,
    setDisplayUpdatePopUp: PropTypes.func
};

export default ProgressSection;