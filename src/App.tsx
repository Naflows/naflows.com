import "./App.css";
import AppFooter from "./components/main/footer/footer";
import Pricing from "./components/home/pricing";
import { AppHeader } from "./components/main/header";
import TitleContainer from "./components/main/title-container";

function App() {
  return (
    <>
      <TitleContainer
        titleComponent={
          <>
            <span>
              Vous avez des <span id="colorful">besoins</span>.
            </span>
            <span>
              Naflows a des <span id="colorful">solutions</span>.
            </span>
          </>
        }
        descriptionComponent={
          <>
            Chaque offre de Naflows a été pensée pour proposer des produits et
            des solutions au <span id="colorful">meilleur prix</span> pour une{" "}
            <span id="colorful">qualité supérieure</span> et un{" "}
            <span id="colorful">engagement</span> sans faille.
          </>
        }
      />
      <Pricing />

      <div className="global__process_description global__container">
        <div className="global__container__title">
          <h2>Nos solutions</h2>
          <p>
            Les prix affichés correspondent aux tarifs minimums. Le coût final
            dépendra de vos besoins spécifiques et fera l’objet d’un devis
            personnalisé, que vous serez libre d’accepter.
          </p>
        </div>
        <img
          src="/public/assets/process-diagram.svg"
          alt="Le processus de fonctionnement des commandes chez NAFLOWS."
          className="process-diagram"
        />
      </div>

      <div className="global__container promotion__container">
        <div className="promotion__content">
          <h1>
            On n'attend plus que <span id="colorful">vous</span> !
          </h1>
          <p>
            Et si vous avez encore des doutes, n'hésitez pas à en parler.
            Naflows est là pour vous.
          </p>
        </div>
        <div className="promotion__buttons">
            <a
            href="#"
            
            onClick={e => {
              e.preventDefault();
              window.scrollTo({
              top: 0,
              behavior: "smooth"
              });
            }}
            className=" action-button primary-button"
            >
            Voir les produits
            </a>
            <a
            href="/contact"
            className=" action-button secondary-button"
            >
            <span>Contactez-nous</span>
            </a>
        </div>
      </div>
    </>
  );
}

export default App;
