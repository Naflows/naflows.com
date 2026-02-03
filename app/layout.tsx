"use client";
import "./public/styles/index.scss";
import React, { useEffect } from "react";
import Translation from "./public/data/translate.json";

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
      </body>
    </html>
  );
}
