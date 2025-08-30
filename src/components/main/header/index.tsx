import './index.scss';

export const AppHeader = () => {

    return (
        <header>
            <div className="header-left-part">
                <a href="./" className="header-left-part__logo">
                    <img src="../../../../public/assets/naflows_small_logotype.png" alt="Logo de NAFLOWS" />
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
                    <a href="./contact" className="header-right-part__call_to_action-button action-button primary-button">
                        Contact
                    </a>
                </div>
            </div>
        </header>
    )

}



