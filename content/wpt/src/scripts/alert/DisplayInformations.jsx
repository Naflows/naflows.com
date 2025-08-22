import PropTypes from 'prop-types';
import Alert from '../../components/main/alert';

import '../../../public/styles/scripts/alert/DisplayInformations.scss'

const DisplayInformations = ({ setInformationsView }) => {
    return (
        <Alert
            setState={setInformationsView}
            title="Informations"
            message="Informations sur le projet WriPilTra de Naflouille Creations"
            className='big alert informations-popup'
            closeAtTop={true}
            closeFunction={setInformationsView}
            additional_content={[
                <div className='field' key="labels">
                    <div className="label-informations">
                        <a key="ko-fi" href='https://ko-fi.com/N4N0W3P7P' target='_blank'>
                            <img height='70' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' />
                        </a>
                        <iframe src="https://naflouille-creations.com/modules/sponsor/index.html" title="Sponsor" width="270" height="90" style={{border: 'none'}}></iframe>
                    </div>
                </div>,
                <div className='field' key={0}>
                    <div className="title">
                        A propos
                    </div>
                    <div className="description">
                        <span> WriPilTra est un projet de Naflouille Creations sous licence All Rights Reserved. Il a pour but de vous aider à écrire vos projets en vous fournissant des outils pour suivre votre progression.</span>
                        <span>L&apos;<a href="https://wpt.naflouille-creations.com/">accès</a> à WriPilTra est gratuit et sans publicité. Vous pouvez soutenir le projet en <a href="https://ko-fi.com/N4N0W3P7P">achetant un café</a> ou en devenant sponsor.</span>
                    </div>
                </div>,
                <div className='field' key={1}>
                    <div className="title">
                        Histoire
                    </div>
                    <div className="description">
                        <span>WriPilTra est un projet dont la volonté de création existe depuis quelques années. L&apos;idée derrière sa création est la mise à disposition d&apos;un outil simple, intuitif, facile d&apos;utilisation, qui pourrait aider à la fois les écrivains avancés ou rédacteurs en tout genre.</span>
                        <span>D&apos;abord baptisé Linkel, l&apos;ancien corps de projet a rapidement été supprimé du web, car il était conçu uniquement en Javscript, HTML, et CSS, produisant ainsi des résultats relativement passables, qui impactaient l&apos;efficacité du produit et son ergonomie.</span>
                        <span>Aujourd&apos;ui, WriPilTra est à un stade terminal puisqu&apos;il regroupe les principales fonctionnalités voulues pour un tel outil. Cependant, de nouveaux outils pourraient faire leur apparition plus tard.</span>
                    </div>
                </div>,
                <div className='field' key={2}>
                    <div className="title">
                        Données
                    </div>
                    <div className="description">
                        <span>
                            Les données de WriPilTra sont stockées dans le navigateur de l&apos;utilisateur. Cela signifie que les données sont stockées localement, et ne sont pas envoyées à un serveur. Cependant, les données peuvent être perdues si le cache du navigateur est vidé.
                        </span>
                        <span>
                            Naflouille Creations, le fournisseur de service, ne peut être tenu responsable de la perte de données. Il est recommandé de sauvegarder régulièrement les données de WriPilTra. De même,
                            l&apos;organisation susnommée ne peut accéder à aucunes informations stockées dans le navigateur de l&apos;utilisateur et sur sa session WilPilTra.
                        </span>
                        <span>
                            Les changements à cette politique de données seront notifiés aux utilisateurs dans des délais raisonnables.
                        </span>
                    </div>
                </div>
            ]}
        />
    );
};

DisplayInformations.propTypes = {
    setInformationsView: PropTypes.func.isRequired,
};

export default DisplayInformations;