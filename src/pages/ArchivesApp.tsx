import { useEffect, useRef, useState } from "react";
import type Archive from "../archive.type";
import ArticleDisplay from "../../public/data/pages/LearnMore";
import "../../public/styles/components/panel.scss";
import "../../public/styles/components/archives.scss";
import "../../public/styles/index.scss";
import "../../public/styles/pages/archives.scss";

export default function ArchivePage() {
  const [archives, setArchives] = useState<Archive[]>([]);

  const [displayLearnMore, setDisplayLearnMore] = useState<Archive | null>(
    null
  );
  const archivesContainerRef = useRef<HTMLDivElement | null>(null);
  const [archiveWidth, setArchiveWidth] = useState<number>(0);


  const [displayPanelContent, setDisplayPanelContent] = useState<boolean>(false);
  const displayablePanelRef = useRef<HTMLDivElement | null>(null);
  const displayablePanelHeaderRef = useRef<HTMLDivElement | null>(null);
  const [panelContentPreferedHeight, setPanelContentPreferedHeight] = useState<number>(0);
  const [panelHeaderHeight, setPanelHeaderHeight] = useState<number>(0);

  useEffect(() => {
    fetch("/public/data/archives.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort(
          (a: Archive, b: Archive) => parseInt(b.date) - parseInt(a.date)
        );
        setArchives(sortedData);
      });
  }, []);

  useEffect(() => {
    console.log(`Displaying more about ${displayLearnMore?.name}`);
    if (displayLearnMore == null) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [displayLearnMore]);

  const triggerArchiveWidth = () => {
    if (archivesContainerRef.current) {
      const width = archivesContainerRef.current?.clientWidth;
      if (typeof width === "number" && !isNaN(width)) {
        setArchiveWidth((width - 40) / 3);
      }
    }
  };

  useEffect(() => {
    if (displayablePanelRef.current && displayablePanelHeaderRef.current) {
      setPanelContentPreferedHeight(displayablePanelRef.current.offsetHeight);
      setPanelHeaderHeight(displayablePanelHeaderRef.current.clientHeight);
    }
  }, [displayablePanelRef, displayablePanelHeaderRef]);

  useEffect(() => {
    triggerArchiveWidth();
  }, [archivesContainerRef]);
  // Also handle on window resize
  useEffect(() => {
    const handleResize = () => {
      triggerArchiveWidth();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="archives-content">
        {displayLearnMore != null && (
          <ArticleDisplay
            project={{ displayLearnMore }}
            setDisplayLearnMore={setDisplayLearnMore}
          />
        )}
        <div className="row-20 archives-header">
          <div
            className="panel panel-image-only"
            style={{
              width: archiveWidth * 2 + 20 + 100,
            }}
          >
            <div className="panel-header">
              <img src="../public/assets/naflows_full_logotype_green.png" />
              <h2>Explore Naflows' Archives</h2>
            </div>
            <div className="description">
              Discover the history of Naflows' projects and initiatives. Please
              make sure to click "Learn more" to read the documentation, and
              learn more about the project.
            </div>
          </div>
          <div
            className={`panel ${"panel-collapsed"}`}
            ref={displayablePanelRef}
            style={{
              width: archiveWidth * 2 + 20 + 160,
              height: displayPanelContent ? "fit-content" : 50,
            }}
          >
            <div className="panel-header noselect" onClick={() => {
              setDisplayPanelContent(displayPanelContent ? false : true);
            }} ref={displayablePanelHeaderRef}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
                style={{
                  transform : `rotate(${displayPanelContent ? 180 : 0}deg)`,
                }}
              >
                <path d="M480-361q-8 0-15-2.5t-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5Z" />
              </svg>
              <h2>About the Developer</h2>
            </div>
            <div className="panel-content" style={{
              display : displayPanelContent ? "flex" : "none"
            }}>
              <img
                src="/public/MD.jpg"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
              <div className="panel-body">
                <div className="panel-body-text">
                  <h2>Mougel David - Naflows Lead Developer</h2>
                  <div className="description text-readable">
                    All the following projects were developed by David Mougel, a
                    developer since {new Date().getFullYear() - 2020} years, and
                    has been working on various projects since then. He is a
                    self-taught programmer, working with NodeJS, React, Express,
                    Docker, Git, and more.
                  </div>
                </div>
                <div className="socials-buttons">
                  <button
                    className="primary-button"
                    onClick={() => {
                      window.open("https://github.com/naflouille", "_blank");
                    }}
                  >
                    Follow on GitHub
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => {
                      window.open(
                        "https://www.linkedin.com/in/david-mougel-761297334/",
                        "_blank"
                      );
                    }}
                  >
                    Follow on LinkedIn
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => {
                      window.open(
                        "https://github.com/sponsors/naflows/",
                        "_blank"
                      );
                    }}
                  >
                    Support the Business
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="archive-fields" ref={archivesContainerRef}>
          {archives.map((archive: Archive, index) => (
            <div
              className="field"
              key={index}
              style={{
                minWidth: archiveWidth,
                maxWidth: archiveWidth,
              }}
            >
              <div className="field-content">
                <div className="field-header">
                  <h3
                    className="field-header-status"
                    style={{
                      backgroundColor:
                        archive.status === "active" ? "#1FA218FF" : "#c22f16ff",
                      color: "white",
                    }}
                  >
                    {archive.status}
                  </h3>
                  {archive.svg && (
                    <div className="field-svg">
                      <img
                        src={archive.svg}
                        alt={archive.name}
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="field-body">
                  <div className="field-header-title">
                    <h2>
                      {archive.date} - {archive.name}
                    </h2>
                  </div>

                  <div className="field-description text-readable">{archive.description}</div>
                </div>
                <div className="row-20 buttons-container">
                  <button
                    className="primary-button"
                    onClick={() => {
                      window.location.href = archive.url;
                    }}
                  >
                    Explore
                  </button>
                  <button
                    className="secondary-button "
                    onClick={() => {
                      setDisplayLearnMore(archive);
                    }}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
