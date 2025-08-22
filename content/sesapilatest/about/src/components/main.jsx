import app from '../../../app';
import AppButton from '../../../public/modules/utilities/buttons/visual';
import appSvg from '../../../public/modules/utilities/svg';
import './index.css';


const MainAboutPage = () => {
    return (
        <div className="main-render">
            <div className="title">
                <div className="main">
                    <div className="hover"></div>
                    <span className="linear-sesapi">SesAPI</span> <span>by</span> <span className="linear-nfc">Naflouille Creations</span>
                </div>
                <div className="description">
                    <div className="hover"></div>
                    Combining <span className="sesapi">our knowledge</span> and 
                     <span className="sesapi"> yours </span> 
                    to create something unique.
                </div>
            </div>
            
            <div className="buttons">
                <div className="main">
                    <AppButton 
                        type="filled"
                        container={{
                            text : 'Get started'
                        }}
                        action={() => {
                            window.open('https://w0lfan.github.io/SesAPI/','_self')
                        }}
                        custom_properties={["bigButton"]}
                    />
                    {/* 
                        <AppButton 
                            type="unfilled"
                            container={{
                                text : 'Learn more'
                            }}
                            custom_properties={["bigButton"]}
                        />
                    */}
                </div>
                <AppButton 
                    type="blank"
                    container={{
                        text : 'Naflouille Creations',
                        svg : appSvg.new('open')
                    }}
                    custom_properties={["bigButton"]}
                    action={() => {
                        window.open(app.support.src);
                    }}
                />
            </div>
        </div>
    )
};

export default MainAboutPage;