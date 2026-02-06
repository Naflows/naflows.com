"use client";
import { useTranslate } from "../layout";
import '@/public/styles/about-me.scss';


const GetIcon = ({ name }: { name: string }) => {
    switch (name) {
        case "innovation":
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M423.5-103.5Q400-127 400-160h160q0 33-23.5 56.5T480-80q-33 0-56.5-23.5ZM360-200q-17 0-28.5-11.5T320-240q0-17 11.5-28.5T360-280h240q17 0 28.5 11.5T640-240q0 17-11.5 28.5T600-200H360Zm-30-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Z"/></svg>;
        case "support":
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M423.5-743.5Q400-767 400-800t23.5-56.5Q447-880 480-880t56.5 23.5Q560-833 560-800t-23.5 56.5Q513-720 480-720t-56.5-23.5ZM360-120v-480q-49-4-99-11t-98-18q-17-4-27.5-19t-5.5-32q5-17 21-25t34-4q70 15 145.5 22t149.5 7q74 0 149.5-7T775-709q18-4 34 4t21 25q5 17-5.5 32T797-629q-48 11-98 18t-99 11v480q0 17-11.5 28.5T560-80q-17 0-28.5-11.5T520-120v-200h-80v200q0 17-11.5 28.5T400-80q-17 0-28.5-11.5T360-120Z"/></svg>;
        case "improvement":
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M272-160q-30 0-51-21t-21-51q0-21 12-39.5t32-26.5l156-62v-90q-48 55-108 87.5T162-322q-17 2-29.5-9.5T120-360q0-17 11-29t28-14q55-8 101-34t84-71l54-64q12-14 28-21t34-7h40q18 0 34 7t28 21l54 64q38 45 84 71t101 34q17 2 28 14t11 29q0 17-12.5 28.5T798-322q-70-8-130-40.5T560-450v90l156 62q20 8 32 26.5t12 39.5q0 30-21 51t-51 21H400v-20q0-26 17-43t43-17h120q9 0 14.5-5.5T600-260q0-9-5.5-14.5T580-280H460q-42 0-71 29t-29 71v20h-88Zm151.5-503.5Q400-687 400-720t23.5-56.5Q447-800 480-800t56.5 23.5Q560-753 560-720t-23.5 56.5Q513-640 480-640t-56.5-23.5Z"/></svg>;
    }
}


export default function AboutMe() {
    const { translate } = useTranslate();

    if (translate === null) return null;

    return (
        <div className="about__me__page">


            <div className="content">
                <div className="ambitions">
                    <h2>{translate['about-me']['ambitionsContent']['title']}</h2>
                    <div className="ambitions__list">
                        {
                            translate['about-me']['ambitions'].map((ambition: any, index: number) => (
                                <div key={index} className="ambition">
                                    <div className="ambition__header">
                                        <div className="ambition__icon">
                                            <GetIcon name={ambition.icon} />
                                        </div>
                                        <h3 className="ambition__name">{ambition.name}</h3>
                                    </div>
                                    <p className="ambition__description">{ambition.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="values">
                    <h2>{translate['about-me']['valuesContent']['title']}</h2>
                    <div className="values__list">
                        {
                            translate['about-me']['values'].map((value: any, index: number) => 
                                <div key={index} className="value">
                                        <h3 className="value__name">{value.name}</h3>   
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            .
        </div>
    )
}