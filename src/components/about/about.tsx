import TitleContainer from "../main/title-container";
import "./index.scss";

const formatDate = (minus: number) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - minus);
  return date.getFullYear() > 0 ? "+" + date.getFullYear() + " ans" : 1 + " an";
};

type SocialLinksProps = {
  link: string;
  name: string;
};

const SocialLinks: React.FC<SocialLinksProps> = ({ link, name }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <p>{name}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e3e3e3"
      >
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h560v-240q0-17 11.5-28.5T800-480q17 0 28.5 11.5T840-440v240q0 33-23.5 56.5T760-120H200Zm560-584L416-360q-11 11-28 11t-28-11q-11-11-11-28t11-28l344-344H600q-17 0-28.5-11.5T560-800q0-17 11.5-28.5T600-840h200q17 0 28.5 11.5T840-800v200q0 17-11.5 28.5T800-560q-17 0-28.5-11.5T760-600v-104Z" />
      </svg>
    </a>
  );
};

const About = () => {
  return (
    <>
      <TitleContainer
        titleComponent={<>À propos de Naflows</>}
        descriptionComponent={
          <>Apprenez-en plus sur Naflows et son histoire.</>
        }
      />

      <div className="about__page">
        <div className="portrait__founder">
          <div className="informations">
            <div className="main__content">
              <img src="/public/assets/mougel-david.jpg" />

              <div className="main__content_container">
                <div className="informations__content">
                  <h1>Mougel David</h1>
                  <h3>Étudiant en informatique</h3>
                </div>
                <div className="socials__links">
                  <SocialLinks
                    link="https://www.linkedin.com/in/david-mougel-761297334/"
                    name="LinkedIn"
                  />
                  <SocialLinks
                    link="https://discordapp.com/users/1404117700669870090"
                    name="Discord"
                  />
                  <SocialLinks
                    link="https://github.com/naflouille"
                    name="Github"
                  />
                  <SocialLinks
                    link="mailto:mougel.david@naflows.com"
                    name="Email"
                  />
                </div>
              </div>
            </div>
            <div className="informations__content">
              <h2>Compétences</h2>
              <ul>
                <li>
                  {formatDate(2020)} dans le développement web et le design
                  d'interface
                </li>
                <li>
                  {formatDate(2024)} dans les applications Android, et le
                  backend
                </li>
                <li>{formatDate(2025)} dans l'entrepreneuriat</li>
                <li>
                  Bac {formatDate(2023).replace("ans", "")} en informatique
                </li>
                <li>
                  Connaissance des technologies web modernes (React, Node.js,
                  Express, etc.)
                </li>
                <li>
                    Connaissance en hardware (Raspberry PI, etc)
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="informative__content">
          <img src="/public/assets/naflows_full_logotype.png" />
          <div className="content">
            <h2>Mon histoire</h2>
            <p>
              J'ai créé Naflows pour la mise en place de solutions innovantes,
              customisées, et modulables, adaptées aux besoins de chacun. Fort
              de mon expérience de cinq années dans l'informatique, j'ai pu
              développer des compétences solides en matière de programmation, de
              gestion de projet, de cloud, et de communication. Mon objectif est
              de fournir des services de qualité qui répondent aux besoins
              spécifiques de mes clients. Mon écoute, ma réactivité, et ma
              capacité d'adaptation sont des atouts que je mets au service de
              chaque projet.
            </p>
          </div>
          <div className="content">
            <h2>Ma vision</h2>
            <p>
              Je crois fermement en l'importance de l'innovation et de
              l'adaptabilité dans le monde numérique d'aujourd'hui. Ma vision
              pour Naflows est de créer des solutions qui non seulement
              répondent aux besoins actuels de mes clients, mais qui anticipent
              également leurs besoins futurs. Mon objectif est de faire de
              Naflows un leader dans le domaine des solutions numériques sur
              mesure.
            </p>
          </div>
          <div className="content">
            <h2>Mes objectifs</h2>
            <p>
              NAFLOWS a pour objectif de devenir indépendant de toute
              technologie propriétaire, en privilégiant les solutions
              open-source, personnalisées et en favorisant l'interopérabilité
              entre ses différents systèmes. Je souhaites également m'engager
              dans une démarche éthique et responsable, en tenant compte des
              enjeux sociaux et environnementaux dans le développement de nos
              solutions. <br />
              Dans un souci de transparence, je m'engage à toujours informer mes
              clients des technologies utilisées et des implications de leurs
              choix technologiques.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
