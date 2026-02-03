"use client";
import { useTranslate } from "./layout";
import Links from "./public/data/links.json";
import NAFLOWS_LOGOTYPE from "./public/assets/naflows.svg";
import Image from "next/image";
import MOUGELDavid from "./public/assets/md.jpg";

export default function Home() {
  const { translate } = useTranslate();

  return (
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

        <div className="footer__logo">
          <Image src={NAFLOWS_LOGOTYPE} alt="Naflows Logo" height={100} />
        </div>



      </div>



    </div>
  );
}
