import './index.scss';

const TitleContainer = ({
    titleComponent,
    descriptionComponent
} : {
    titleComponent: React.ReactNode;
    descriptionComponent: React.ReactNode;
}) => {
    return (
        <div className="title-container__main">
            <h1 className="title-container__main__title">
                {titleComponent}
            </h1>
            <p className="title-container__main__description">
                {descriptionComponent}
            </p>
        </div>
    )
}

export default TitleContainer;