import PropTypes from 'prop-types';
import Alert from '../../../../../components/main/alert';
import appStorage from '../../../../modules/main/storage-management/directory';

const Help = ({ firstConnection, setFirstConnection, setProjectCreationComponentState, setInformationsView }) => {
    return (
        <>
            {firstConnection && (
                <Alert
                    title="Bienvenue sur WriPilTra (Writing Pilot Tracker)"
                    className=''
                    additional_content={[
                        <div key={0} className='field'>
                            <div className="title">
                                Comment ça marche ?
                            </div>
                            <div className="description">
                                <span>
                                    Write Progress Tracker est une application qui vous permet de suivre la progression de vos projets d&apos;écriture. Vous pouvez ajouter des projets, les mettre à jour et suivre vos progrès.
                                </span>
                                <span>WriPilTra est un outil simple d&apos;utilisation. Vous pouvez ajouter un projet en cliquant sur le bouton &quot;Créer un nouveau projet&quot;.</span>
                                <span>Vous pouvez rechercher un projet en cliquant sur le bouton &quot;Rechercher&quot;.</span>
                                <span>Vous pouvez écrire en cliquant sur le bouton &quot;Ecrire&quot;.</span>
                                <span>Vous pouvez mettre à jour un projet en cliquant sur le bouton &quot;Mettre à jour&quot; dans la liste des projets.</span>
                                <span>Vous pouvez obtenir des informations sur WriPilTra en cliquant sur le bouton &quot;Informations&quot;.</span>
                            </div>
                        </div>,
                        <div key={1} className='field'>
                            <iframe src="https://naflouille-creations.com/modules/sponsor/index.html" title="Sponsor" width="270" height="90" style={{ border: 'none' }}></iframe>
                        </div>,
                    ]}
                    buttons={[
                        {
                            text: "Commencer",
                            className: "primary",
                            onClick: () => {
                                appStorage.connection.firstConnectionCheck(
                                    firstConnection, setFirstConnection
                                );
                                setProjectCreationComponentState(true);
                            }
                        },
                        {
                            text: "Support",
                            className: "primary",
                            onClick: () => {
                                window.location.href = "https://discord.gg/wtvGdj43F7";
                            }
                        },
                        {
                            text: "En savoir plus",
                            className: "secondary",
                            onClick: () => {
                                appStorage.connection.firstConnectionCheck(
                                    firstConnection, setFirstConnection
                                );
                                setInformationsView(true);
                            }
                        }
                    ]}
                />
            )}
        </>
    );
};

Help.propTypes = {
    firstConnection: PropTypes.bool.isRequired,
    setFirstConnection: PropTypes.func.isRequired,
    setProjectCreationComponentState: PropTypes.func.isRequired,
    setInformationsView: PropTypes.func.isRequired,
};

export default Help;