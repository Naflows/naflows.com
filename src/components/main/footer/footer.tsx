
import './footer.scss';

const AppFooter = () => {
    return (
        <footer>
            <div className='footer-logo'>
                <img src="../../../public/assets/naflows_full_logotype.png" alt="Naflows Logo" />
                <p>© 2025 Naflows. Tous droits réservés.</p>
            </div>

            <div className='footer-links'>
                <a href="/about">À propos</a>
                <a href="/legal">Informations légales</a>
                <a href="/legal">Politique de confidentialité</a>
                <a href="/contact">Contact</a>
            </div>
        </footer>
    );
}

export default AppFooter;
