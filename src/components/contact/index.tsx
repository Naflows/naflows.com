import { AppHeader } from "../main/header";
import TitleContainer from "../main/title-container";


const ContactPage = () => {




    return (
        <>
            <AppHeader />
            <TitleContainer
                titleComponent={
                    <>Nous contacter</>
                }
                descriptionComponent={
                    <>Vous avez trouvé la solution qui vous convient, ou vous hésitez encore ? N'hésitez pas à prendre contact avec Naflows.</>
                }
            />

            <form className="contact-form">
                <div className="contact-form__informations__part">
                    <div className="contact-form__informations__basic">
                        <div className="contact-form__informations_identity">
                            
                        </div>
                        <div className="contact-form__informations_meeting">
                            <div className="contact-form__meeting__time">

                            </div>
                            <div className="contact-form__meeting_way">

                            </div>
                        </div>
                    </div>
                    <div className="contact-form__informations__user">

                    </div>
                    <button className="contact-form__informations__submit action-button primary-button" type="submit">
                        <p>Prendre rendez-vous</p>
                    </button>
                </div>

            </form>
        </>
    )
};

export default ContactPage;