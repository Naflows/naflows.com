import TitleContainer from "../main/title-container";
import './index.scss';


const LegalInformations = () => {
  return (
    <>
      <TitleContainer
        titleComponent={<>Mentions légales</>}
        descriptionComponent={
          <>
            Consultez nos mentions légales pour en savoir plus sur nos
            politiques.
          </>
        }
      />

      <div className="legal__content">
        <div className="legal__business">
          <b>Raison sociale</b> : MOUGEL DAVID<br />
          <b>Numéro Siren</b> : 933761850<br />
          <b>Numéro Siret</b> : 93376185000017 (siège de l'entreprise)<br />
          <b>Numéro TVA intracommunautaire</b> : FR58933761850 (en savoir plus)<br />
          <b>Greffe</b> : RCS Albi<br />
          <b>Code NAF / APE</b> : 6201Z (programmation informatique)<br />
          <b>Forme juridique</b> : Entrepreneur individuel<br />
          <b>Date d'immatriculation</b> : 01/10/2024<br />
          <b>Commune d'implantation</b> : Albi (Tarn)
        </div>
        <div className="legal__website">
            Ce site est exempté de consentement <b>pour le moment</b>, car il ne collecte pas de données personnelles. Vos données de navigation, vos informations privées, vos communications et vos fichiers ne sont pas suivis, enregistrés ou partagés.<br />
            Toutefois, Naflows se réserve le droit de conserver toutes informations que vous fournissez volontairement, notamment lors de la création d'un compte (à venir), de l'utilisation de nos services ou lorsque vous communiquez avec nous. Ces informations peuvent inclure, mais ne sont pas limitées à, votre nom, adresse e-mail, numéro de téléphone, et toute autre information que vous choisissez de partager.<br />
            Vous serez notifié lors du changement de nos <b>pratiques de confidentialité</b> si vous êtes concerné par la mise à jour de nos conditions d'utilisation.
        </div>
      </div>
    </>
  );
};

export default LegalInformations;
