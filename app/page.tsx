"use client";
import { useTranslate } from "./layout";
import Links from "@/public/data/links.json";
import Image from "next/image";
import MOUGELDavid from "@/public/assets/md.jpg";
import LearnMore from "./components/learn-more";
import { JSX } from "react/jsx-dev-runtime";

function Card({
  name,
  content,
  action,
  img,
  class: className
}: {
  name: string;
  content: string;
  action: {
    type: "link" | "download";
    url: string;
    name: string;
  },
  img?: string;
  class?: string;
}): JSX.Element {
  return (
    <div className={`card ${className} ${img ? "card--with-image" : ""}`}>
      <div className="card__header">
        <div className="header__main">
          <div className="card__name">{name}</div>
        </div>
        <div className="card__content">{content}</div>
      </div>

      <div className="card__content">
        {img && (
          <div className="card__image">
            <img src={img} alt={name} className="card__image__img" />
          </div>
        )}

        <div className="card__action">
          {action.type === "link" ? (
            <a
              href={action.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card__action__link"
            >
              <span>
                {action.name}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z" /></svg>
            </a>
          ) : (
            <a
              href={action.url}
              download
              className="card__action__link"
            >
              <span>
                {action.name}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M465-339.5q-7-2.5-13-8.5L308-492q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T365-549l75 75v-286q0-17 11.5-28.5T480-800q17 0 28.5 11.5T520-760v286l75-75q12-12 28.5-11.5T652-548q11 12 11.5 28T652-492L508-348q-6 6-13 8.5t-15 2.5q-8 0-15-2.5ZM240-160q-33 0-56.5-23.5T160-240v-80q0-17 11.5-28.5T200-360q17 0 28.5 11.5T240-320v80h480v-80q0-17 11.5-28.5T760-360q17 0 28.5 11.5T800-320v80q0 33-23.5 56.5T720-160H240Z" /></svg>
            </a>
          )}
        </div>
      </div>


    </div>
  );
}


export default function Home() {
  const { translate } = useTranslate();

  return (
    <div className="main">

      <div className="header__content">

        <div className="small--cards">
          <Card
            name={translate ? translate["cards"]["cv"]["title"] : "Loading..."}
            content={translate ? translate["cards"]["cv"]["description"] : "Loading..."}
            action={{ type: "download", url: `/files/cv_${translate ? translate["lang"] : "EN"}.pdf`, name: translate ? translate["cards"]["cv"]["actionName"] : "Loading..." }}
            class="mx-250"
          />

          <Card
            name={translate ? translate["cards"]["design"]["title"] : "Loading..."}
            content={translate ? translate["cards"]["design"]["description"] : "Loading..."}
            action={{ type: "link", url: "/designs", name: translate ? translate["cards"]["design"]["actionName"] : "Loading..." }}
            class="mx-250"
          />

          <Card
            name={translate ? translate["cards"]["archives"]["title"] : "Loading..."}
            content={translate ? translate["cards"]["archives"]["description"] : "Loading..."}
            action={{ type: "link", url: translate ? translate["cards"]["archives"]["url"] : "#", name: translate ? translate["cards"]["archives"]["actionName"] : "Loading..." }}
            class="mx-250"
          />
        </div>

        <Card
          name={translate ? translate["cards"]["nass"]["title"] : "Loading..."}
          content={translate ? translate["cards"]["nass"]["description"] : "Loading..."}
          action={{ type: "link", url: translate ? translate["cards"]["nass"]["url"] : "#", name: translate ? translate["cards"]["nass"]["actionName"] : "Loading..." }}
          img={translate ? translate["cards"]["nass"]["image"] : undefined}
        />
      </div>



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

          <LearnMore translate={translate} />



        </div>



      </div>
    </div>
  );
}
