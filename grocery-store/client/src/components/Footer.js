import React from 'react';
import '../assets/styles/Footer.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { HOME } from '../utils/consts';

const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <div className='footer__inner'>
                    <div className="footer__left">
                        <Link className="logo" to={HOME}>DIEGO</Link>
                    </div>
                    <div className="footer__right">
                        <p className="footer__contact-info">Контактные данные:</p>
                        <Link to='tel:+78008008080' className="footer__contact-info">+7 (800) 800 80 80</Link>
                        <Link to='mailto:testmail@gmail.com' className="footer__contact-info">egorcom27@gmail.com</Link>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;