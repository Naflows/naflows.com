import TitleContainer from "../main/title-container";


const ContactPage = () => {




    return (
        <>
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
                    <div className="warning__informational__box">
                        Pour l'instant, Naflows n'est pas en mesure de proposer de rendez-vous en ligne.
                        <br />
                        Vous pouvez nous contacter par email à <a href="mailto:administration@naflows.com">administration@naflows.com</a> pour toute demande d'information.
                    </div>
                   
                </div>

            </form>
        </>
    )
};

export default ContactPage;