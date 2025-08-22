import { useEffect, useState } from "react";
import NaflowsButton from "../../../@components/button";
import type Archive from "../../../src/archive.type";
import type Article from "../../../src/article.type";
import "../../../public/styles/components/archives-learn-more.scss";

type ArticleDisplayProps = {
  project: {
    displayLearnMore: Archive;
  };
  setDisplayLearnMore: (archive: Archive | null) => void;
};

export default function ArticleDisplay({
  project,
  setDisplayLearnMore,
}: ArticleDisplayProps) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch("/public/data/articles.json").then((response) => {
      response.json().then((data) => {
        const articleData = data.find((article: Article) =>
          article.id.includes(project.displayLearnMore.id)
        );
        setArticle(articleData);
      });
    });
  }, []);

  return (
    <div className="learn-more">
      <div className="learn-more-box">
        <div className="go-back">
          <button
            className="primary-button"
            onClick={() => {
              const learnMore: HTMLElement | null =
                document.querySelector(".learn-more");
              const learnMoreBox: HTMLElement | null =
                document.querySelector(".learn-more-box");

              if (!learnMore || !learnMoreBox) return;

              learnMore.classList.add("animate-font-back");
              learnMoreBox.classList.add("animate-learn-more-back");
              setTimeout(() => {
                learnMore.classList.remove("animate-font-back");
                learnMoreBox.classList.remove("animate-learn-more-back");
                setDisplayLearnMore(null);
              }, 500);
            }}
          >
            Go back
          </button>
        </div>
        <div className="learn-more-box-header">
          <div className="learn-more-box-image">
            <img src={project.displayLearnMore.svg} />
          </div>
          <div className="learn-more-box-title">
            {project.displayLearnMore.date} - {project.displayLearnMore.name}
          </div>
          {project.displayLearnMore.contributors && (
            <div className="learn-more-box-contributors">
              Special thanks to{" "}
              {project.displayLearnMore.contributors.join(", ")}
            </div>
          )}
        </div>
        <div className="learn-box-content">
          {article &&
            article.titles &&
            article.titles.map((title, index) => {
              const paragraphs = article.paragraphs[`${title.id}`];
              return (
                <div key={index} className="learn-box-paragraph-content">
                  <div className="learn-box-paragraph-title">{title.name}</div>
                  <div className="learn-box-paragraphs">
                    {paragraphs.map((paragraph, index) => (
                      <div key={index} className="learn-box-paragraph text-readable">
                        {paragraph}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
