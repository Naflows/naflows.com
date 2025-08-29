import { useEffect, useState } from "react";
import TitleContainer from "../main/title-container";
import "./index.scss";

async function fetchData() {
  const data = await fetch("/public/showcase/data/showcase.json").then(
    (res) => {
      return res.json();
    }
  );
  return data;
}

const ShowCase = () => {
  const [showcaseData, setShowcaseData] = useState<
    Array<{
      id: number;
      name: string;
      description: string;
      type: "developement" | "design";
      technologies: Array<string>;
      banner: string;
      yearRange: Array<number>;
      link: string;
    }>
  >([]);

  useEffect(() => {
    async function getData() {
      const d = await fetchData();
      // Sort data by yearRange
      d.sort((b: { yearRange: Array<number> }, a: { yearRange: Array<number> }) => Math.min(...a.yearRange) - Math.min(...b.yearRange));
      setShowcaseData(d);
    }
    getData();
  }, []);

  return (
    <>
      <TitleContainer
        titleComponent={
          <>
            <span>
              Découvrez les <span id="colorful">projets</span> réalisés avec
              Naflows.
            </span>
          </>
        }
        descriptionComponent={
          <>
            <span>
              Naflows apporte flexibilité, originalité, et créativité à vos
              projets, tout en s'adaptant à vos besoins spécifiques.<br/> Cliquer sur un projet l'ouvrira dans un nouvel onglet.
            </span>
           
          </>
        }
      />

      <div className="projects">
        {showcaseData &&
          showcaseData.map((data) => {
            return (
              <div className="project-card" onClick={() => {
                window.open(data.link, "_blank");
              }}>
                <span
                  className="project-type"
                  style={{
                    backgroundColor:
                      data.type === "developement" ? "#ED583E" : "#38BDF8",
                  }}
                >
                  {data.type}
                </span>
                <img
                  className="project-banner"
                  src={data.banner}
                  alt={data.name}
                />
                <div className="project-body">
                  <div className="project-header">
                    <h3>{data.name}</h3>
                  </div>
                  <p>{data.description}</p>

                  <ul className="project-technologies">
                    {data.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
      </div>


      <TitleContainer
        titleComponent={
            <>
                Découvrez plus de projets 
            </>
        }
        descriptionComponent={
            <>
                L'ensemble des projets réalisées par Naflows et Naflouille Creations sont trouvables sur <a href="https://archives.naflows.com">https://archives.naflows.com</a>.
            </>
        }/>
    </>
  );
};

export default ShowCase;
