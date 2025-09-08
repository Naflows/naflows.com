import { useEffect, useRef, useState } from "react";
import "./index.scss";

export const AppHeader = () => {
  const ref = useRef<HTMLElement>(null);
  const [headerWidth, setHeaderWidth] = useState(0);
  const [pageWidth, setPageWidth] = useState(window.innerWidth);
  const [scrollLevel, setScrollLevel] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setHeaderWidth(ref.current.offsetWidth);
        setPageWidth(window.innerWidth);
        ref.current.style.width = `${window.innerWidth * 0.9 - 80}px`;
        ref.current.style.transition = "width 0.3s ease, height 0.3s ease";
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrollLevel(scrollTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      if (scrollLevel > 50) {
        ref.current.style.width = `${pageWidth * 0.6}px`;
        ref.current.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";

        ref.current.style.transition = "width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease";
      } else {
        ref.current.style.width = `${pageWidth * 0.9 - 40}px`;
        ref.current.style.boxShadow = "none";

        ref.current.style.transition = "width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease";
      }
    }
  }, [scrollLevel]);

  return (
    <header ref={ref} className="app-header">
      <div className="header-left-part">
        <a href="./" className="header-left-part__logo">
          <img
            src="../../../../public/assets/naflows_small_logotype.png"
            alt="Logo de Naflows"
          />
        </a>
        <nav className="header-nav">
          <ul>
            <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="/about">À propos</a>
            </li>
            <li>
              <a href="/showcase">Showcase</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-right-part">
        <div className="header-right-part__call_to_action">
          <a
            href="./contact"
            className="header-right-part__call_to_action-button action-button primary-button"
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};
