"use client";
import { useTranslate } from "../layout";
import '@/public/styles/design.scss';


interface DesignProject {
    name: string;
    url: string;
    description: string;
    language: string;
    developed: boolean;
    files: {
        name: string;
        url: string;
    }[]
}

export default function Design() {
    const { translate } = useTranslate();


    return (
        <div className="design__page">


            <div className="design__header">
                <div className="design__header__title">
                    <h1 className="design__header__title">{translate ? translate["design"]["title"] : "Loading..."}</h1>
                    <p className="design__header__description">{translate ? translate["design"]["description"] : "Loading..."}</p>
                </div>

                <p className="design__header__history">{translate ? translate["design"]["history"] : "Loading..."}</p>
            </div>

            <div className="design__card__content">
                {
                    translate && translate.design.content.map((project: DesignProject, index: number) => (
                        <div key={index} className="design__project">
                            <div className="design__body">
                                <div className="design__project__head">
                                    <div className="project__tags">
                                        <div className="design__project__tag" style={{
                                            display: project.developed ? "flex" : "none"
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m620-284 56-56q6-6 6-14t-6-14L540-505q4-11 6-22t2-25q0-57-40.5-97.5T410-690q-11 0-21 1t-20 5q-9 4-11 14t5 17l74 74-56 56-74-74q-7-7-17-5t-14 11q-3 10-4.5 20t-1.5 21q0 57 40.5 97.5T408-412q13 0 24.5-2t22.5-6l137 136q6 6 14 6t14-6ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" /></svg>
                                            <span>
                                                {translate ? translate["requestDemo"] : "Loading..."}
                                            </span>
                                        </div>
                                        <div className="design__project__tag">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M620-40q-83 0-154.5-43T356-198q-8-17-8-34.5t10-33.5q10-16 26-25t35-9h249q1-11 1.5-21.5t.5-21.5q0-9-.5-18.5T668-380h-19q-17 0-28.5-11.5T609-420q0-17 11.5-28.5T649-460h155q-14-22-33-39.5T729-530q-17-9-23-26t1-32q7-15 21-21t27 1q76 38 120.5 110.5T920-340q0 125-87.5 212.5T620-40Zm-95-102q-7-20-12.5-39t-9.5-39h-67q17 25 39.5 45t49.5 33Zm95 14q12-22 20.5-45t14.5-47h-70q6 24 15 47t20 45Zm95-14q27-13 49.5-33t39.5-45h-67q-5 20-10 39t-12 39Zm33-158h88q2-10 3-19.5t1-20.5q0-11-1-20.5t-3-19.5h-88q1 9 1.5 18.5t.5 18.5q0 11-.5 21.5T748-300Zm-408-20q-125 0-212.5-87.5T40-620q0-125 87.5-212.5T340-920q125 0 212.5 87.5T640-620q0 125-87.5 212.5T340-320ZM240-640q17 0 28.5-11.5T280-680q0-17-11.5-28.5T240-720q-17 0-28.5 11.5T200-680q0 17 11.5 28.5T240-640Zm100 176q48 0 85.5-27t54.5-69H200q17 42 54.5 69t85.5 27Zm100-176q17 0 28.5-11.5T480-680q0-17-11.5-28.5T440-720q-17 0-28.5 11.5T400-680q0 17 11.5 28.5T440-640Z" /></svg>
                                            <span>
                                                {project.language == "EN" ? "ENGLISH" : "FRENCH"}
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="design__project__name">{project.name}</h2>
                                </div>
                                <p className="design__project__description">{project.description}</p>
                            </div>
                            <div className="design__files">
                                <h5>
                                    {translate ? translate["design"]["files"] : "Loading..."}
                                </h5>
                                <div className="design__project__files">
                                    {project.files.map((file, fileIndex) => (
                                        <a key={fileIndex} href={file.url} className="design__project__file" target="_blank" rel="noopener noreferrer">
                                            <span>
                                                {file.name}
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M465-339.5q-7-2.5-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5q-8 0-15-2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z" /></svg>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}