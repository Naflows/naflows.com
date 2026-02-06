"use client";
import "@/public/styles/index.scss";
import React, { useEffect } from "react";
import Translation from "@/public/data/translate.json";

// Context provider for children:
const TranslateContext = React.createContext<{
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  translate: any;
}>({
  lang: "EN",
  setLang: () => { },
  translate: null,
});

export const useTranslate = () => React.useContext(TranslateContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [lang, setLang] = React.useState("EN");
  const [translate, setTranslate] = React.useState<any>(Translation["EN"]);

  const [currentPage, setCurrentPage] = React.useState("");

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/designs")) setCurrentPage("designs");
    if (path.includes("/about-me")) setCurrentPage("about-me");
    else setCurrentPage("home");
  }, []);


  return (
    <html lang="en">
      <body>

        <div className="app__footer">
          {
            currentPage != "home" && (
              <a href="/" className="app__footer__link">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M253-446q-9-6-13.5-15t-4.5-19q0-10 4.5-19t13.5-15l326-207q5-3 10.5-4.5T600-727q16 0 28 11.5t12 28.5v414q0 17-12 28.5T600-233q-5 0-10.5-1.5T579-239L253-446Z"/></svg>
                <span>
                  {translate ? translate["home"] : "Loading..."}
                </span>
              </a>
            )
          }
          <div className="open__to__work">
            <div className="slide__text">
              {translate ? translate["openToWork"]["clients"] : "Loading..."}
              <a href="mailto:mougel.david@naflows.com" className="slide__text--link">
                {translate ? translate["openToWork"]["contactText"] : "Loading..."}
              </a>
            </div>
          </div>
          <div className="language-switcher">
            {[
              { n: "EN", l: "English" },
              { n: "FR", l: "Français" }
            ].map((language) => (
              <button
                key={language.n}
                onClick={() => {
                  setLang(language.n);
                  setTranslate(Translation[language.n]);
                }}
                className={
                  lang === language.n
                    ? "language-switcher__button--active"
                    : "language-switcher__button"
                }
              >
                {language.l}
              </button>
            ))}
          </div>
        </div>


        <TranslateContext.Provider value={{ lang, setLang, translate }}>
          {children}
        </TranslateContext.Provider>


      </body>
    </html>
  );
}
