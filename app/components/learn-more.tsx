

export default function LearnMore({
    translate
} : {
    translate: any
}) {
    return (
        <div className="about__content">
            <h2>{translate ? translate["learn-more"]["title"] : "Loading..."}</h2>
            <div className="about__content__links">
                {translate["learn-more"]["links"].map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about__content__link"
                    >
                        {link.name}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z" /></svg>
                    </a>
                ))}
            </div>
        </div>

    )
}