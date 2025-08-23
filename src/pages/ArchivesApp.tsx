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

  const displayablePanelRef = useRef<HTMLDivElement | null>(null);
  const displayablePanelHeaderRef = useRef<HTMLDivElement | null>(null);
  const [panelContentPreferedHeight, setPanelContentPreferedHeight] =
    useState<number>(0);
  const [panelHeaderHeight, setPanelHeaderHeight] = useState<number>(0);

  const [selectedProject, setSelectedProject] = useState<Archive | null>(null);

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
    <div className="naflows-page">
      <div className="naflows-header">
        <h1>
          /<a href="./">NAFLOWS</a>/Projects
        </h1>
        <p>Explore our most important projects.</p>
      </div>

      <div className="archives-content">
        <div className="archived-holder panel width-fit">
          <div className="content">
            {archives &&
              archives.map((archive: Archive) => {
                if (archive.status === "discontinued") {
                  return (
                    <div className="archive-item" key={archive.id}>
                      <h3>{archive.name}</h3>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#1f1f1f"
                      >
                        <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z" />
                      </svg>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

/*

        <div className="archive-fields" ref={archivesContainerRef}>
          {archives.map((archive: Archive, index) => (
            <div
              className="field"
              key={index}
              style={{
                minWidth: archiveWidth,
                maxWidth: archiveWidth,
              }}
              onClick={() => {
                setSelectedProject(archive);
              }}
            >
              <div className="bc"></div>

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
                </div>
                <div className="field-body">
                  <div className="field-header-title">
                    <h2>
                      {archive.date} - {archive.name}
                    </h2>
                  </div>

                  <div className="field-description text-readable">
                    {archive.description}
                  </div>
                </div>
              </div>
              <div className="arrow-read">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"/></svg>
              </div>
            </div>
          ))}
        </div>
*/
