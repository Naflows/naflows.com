import PropTypes from 'prop-types';
import Button from '../../../../components/modules/button';
import Input from '../../../../components/modules/input';
import DisplayProgress from '../DisplayProgress';

const SelectChapters = ({
    selectedChapter,
    PreSave,
    modificationActive,
    setModificationActive,
    newCharacterCount,
    dailyObjective,
    selectedProject
}) => {
    console.log("At SelectChapters.jsx")
    console.log(selectedProject)
    return (
        <div key={0} className="field display-column">
            <div className="field display-row" id="editor-header">
                <Button
                    icon={modificationActive ? '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120q-17 0-28.5-11.5T120-160v-97q0-16 6-30.5t17-25.5l505-504q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L313-143q-11 11-25.5 17t-30.5 6h-97Zm544-528 56-56-56-56-56 56 56 56Z"/></svg>'}
                    text={modificationActive ? "Fermer" : `Modifier ${selectedChapter.name}`}
                    className='primary width-fit-content'
                    onClick={() => {
                        setModificationActive(!modificationActive);
                    }}
                />
                {
                    selectedProject && selectedProject.end ? (
                        <div className="daily-objective">
                            {newCharacterCount >= dailyObjective ? (
                                <span id="big-weight">
                                    Objectif journalier atteint ! Bien joué !
                                </span>
                            ) : (
                                <>
                                    <span>
                                        Objectif journalier
                                    </span>
                                    <DisplayProgress
                                        max={dailyObjective}
                                        progress={newCharacterCount}
                                    />
                                </>
                            )}
                        </div>
                    ) : null
                }
            </div>
            <div className="field" style={{
                display : modificationActive ? 'flex' : 'none'
            }}>
                <Input
                    type="text"
                    placeholder='Nom du chapitre'
                    value={selectedChapter.name}
                    onChange={() => PreSave()}
                    parameters={{
                        id : "chapter-name"
                    }}
                />
                <Input
                    className='textarea'
                    placeholder='Résumé du chapitre'
                    value={selectedChapter.description}
                    onChange={() => PreSave()}
                    parameters={{
                        id : "chapter-description"
                    }}
                />
            </div>
        </div>
    );
};

SelectChapters.propTypes = {
    selectedChapter: PropTypes.object.isRequired,
    PreSave: PropTypes.func.isRequired,
    modificationActive: PropTypes.bool.isRequired,
    setModificationActive: PropTypes.func.isRequired,
    newCharacterCount: PropTypes.number.isRequired,
    dailyObjective: PropTypes.number.isRequired,
    selectedProject: PropTypes.object.isRequired
};

export default SelectChapters;