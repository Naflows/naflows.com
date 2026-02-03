"use client";
import { useTranslate } from "./layout";
import Links from "./public/data/links.json";
import NAFLOWS_LOGOTYPE from "./public/assets/naflows.svg";
import Image from "next/image";
import MOUGELDavid from "./public/assets/md.jpg";

export default function Home() {
  const { translate } = useTranslate();

  return (
    <div className="main">





      <div className="footer">
        <div className="footer__header">
          <div className="footer__content">
            <div className="footer__visual">
              <div className="footer__visual__image">
                <Image
                  src={MOUGELDavid}
                  alt="David Mougel"
                  width={100}
                  height={100}
                  className="footer__visual__image--img"
                />
              </div>
              <div className="footer__socials">
                {Links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    dangerouslySetInnerHTML={{
                      __html: link.icon
                    }}
                  >

                  </a>
                ))}
              </div>
            </div>
            <div className="footer__content__header">
              <h1>{translate ? translate["welcome-title"] : "Loading..."}</h1>
              <p>{translate ? translate["welcome-description"] : "Loading..."}</p>
            </div>
          </div>

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



        </div>


          { /* Switch language button */}
          <div className="language-switcher">
            <button
              onClick={() => {
                const newLang = translate["lang"] === "EN" ? "FR" : "EN";
                window.location.href = `/${newLang.toLowerCase()}`;
              }}
              className="language-switcher__button"
            >
              {translate ? translate["switch-lang"] : "Loading..."}
            </button>
          </div>
      </div>
    </div>
  );
}
