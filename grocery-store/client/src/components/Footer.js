import React from 'react';
import '../assets/styles/Footer.css';
import { Container, NavLink } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <div className='footer__inner'>
                    <div className="footer__left">
                        <p className="logo"><NavLink to="#!">DIEGO</NavLink></p>
                    </div>
                    <div className="footer__right">
                        <p className="footer__contact-info">Контактные данные:</p>
                        <NavLink href='tel:+78008008080' className="footer__contact-info">+7 (800) 800 80 80</NavLink>
                        <NavLink href='mailto:testmail@gmail.com' className="footer__contact-info">testmail@gmail.com</NavLink>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer;