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
  setLang: () => {},
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



  return (
    <html lang="en">
      <body>
        <TranslateContext.Provider value={{ lang, setLang, translate }}>
          {children}
        </TranslateContext.Provider>

          { /* Switch language button */}
          <div className="language-switcher">
            {[
              {n:"EN",l:"English"},
              {n:"FR",l:"Français"}
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
      </body>
    </html>
  );
}
