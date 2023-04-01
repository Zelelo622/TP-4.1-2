import React, { useRef, useState } from 'react';
import '../assets/styles/Header.css';
import { Button, Container, Form, NavLink } from 'react-bootstrap';

const Header = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    /* MOBILE NAV */
    function toggleMobileNav() {
        setIsMobileNavOpen(!isMobileNavOpen);
        document.body.classList.toggle('no-scroll');
    }


    return (
        <>
            <div className="header">
                <Container>
                    <div className='header__inner'>
                        <div className="header__left">
                            <h1 className="logo"><NavLink to="#!">DIEGO</NavLink></h1>
                            {/* <Form className="search d-flex mx-5">
                                <Form.Control
                                    type="search"
                                    placeholder="поиск"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Поиск</Button>
                            </Form> */}

                            <form className='search'>
                                <input className='search__input' type="text" placeholder="Search" />
                                <button className='search__btn' type="submit">
                                    <svg className='svg-search' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.6659 17.7231L23.8047 22.8619C24.0651 23.1223 24.0651 23.5444 23.8047 23.8047C23.5444 24.0651 23.1223 24.0651 22.8619 23.8047L17.7231 18.6659C15.8426 20.326 13.3723 21.3333 10.6667 21.3333C4.77563 21.3333 0 16.5577 0 10.6667C0 4.77563 4.77563 0 10.6667 0C16.5577 0 21.3333 4.77563 21.3333 10.6667C21.3333 13.3723 20.326 15.8426 18.6659 17.7231ZM10.6667 20C15.8213 20 20 15.8213 20 10.6667C20 5.51201 15.8213 1.33333 10.6667 1.33333C5.51201 1.33333 1.33333 5.51201 1.33333 10.6667C1.33333 15.8213 5.51201 20 10.6667 20Z" fill="black" />
                                </svg>
                                </button>
                            </form>
                        </div>
                        <div className="header__right">
                            <nav className="nav">
                                <ul className='nav__list'>
                                    <li className='nav__item'>
                                        <NavLink to="#!">
                                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.64772 4.42857H24.7363L21.0908 18.1429H5.29329L1.64772 4.42857ZM1.64772 4.42857L0.736328 1" stroke="black" strokeWidth="1.38096" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.3692 22.9429C11.3692 24.079 10.5531 25 9.54642 25C8.53972 25 7.72363 24.079 7.72363 22.9429" stroke="black" strokeWidth="1.38096" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M18.6603 22.9429C18.6603 24.079 17.8442 25 16.8376 25C15.8309 25 15.0148 24.079 15.0148 22.9429" stroke="black" strokeWidth="1.38096" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </NavLink>
                                    </li>
                                    <li className='nav__item'>
                                        <NavLink to="#!">
                                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.3971 13.7081C12.3747 13.7081 12.3412 13.7081 12.3189 13.7081C12.2854 13.7081 12.2408 13.7081 12.2073 13.7081C9.67331 13.6299 7.77563 11.6541 7.77563 9.22063C7.77563 6.7425 9.7961 4.72205 12.2743 4.72205C14.7524 4.72205 16.7729 6.7425 16.7729 9.22063C16.7617 11.6653 14.8529 13.6299 12.4306 13.7081C12.4082 13.7081 12.4082 13.7081 12.3971 13.7081ZM12.2631 6.38529C10.7003 6.38529 9.43889 7.65785 9.43889 9.20947C9.43889 10.7388 10.6333 11.9778 12.1515 12.0337C12.185 12.0225 12.2966 12.0225 12.4082 12.0337C13.904 11.9555 15.0761 10.7276 15.0873 9.20947C15.0873 7.65785 13.8259 6.38529 12.2631 6.38529Z" fill="#292D32" />
                                                <path d="M12.2635 24.0003C9.26072 24.0003 6.39188 22.884 4.17049 20.8524C3.96956 20.6738 3.88025 20.4059 3.90258 20.1491C4.0477 18.8207 4.87374 17.5817 6.24677 16.6663C9.57328 14.4561 14.9649 14.4561 18.2802 16.6663C19.6533 17.5928 20.4793 18.8207 20.6244 20.1491C20.6579 20.417 20.5575 20.6738 20.3565 20.8524C18.1351 22.884 15.2663 24.0003 12.2635 24.0003ZM5.65514 19.9259C7.50816 21.4775 9.84118 22.3258 12.2635 22.3258C14.6858 22.3258 17.0188 21.4775 18.8719 19.9259C18.6709 19.2449 18.1351 18.5863 17.3426 18.0505C14.5965 16.2198 9.94165 16.2198 7.17328 18.0505C6.38072 18.5863 5.85607 19.2449 5.65514 19.9259Z" fill="#292D32" />
                                                <path d="M12.2625 23.9999C5.64292 23.9999 0.262451 18.6194 0.262451 11.9999C0.262451 5.38044 5.64292 0 12.2625 0C18.882 0 24.2625 5.38044 24.2625 11.9999C24.2625 18.6194 18.882 23.9999 12.2625 23.9999ZM12.2625 1.67441C6.56943 1.67441 1.93687 6.30695 1.93687 11.9999C1.93687 17.6929 6.56943 22.3255 12.2625 22.3255C17.9555 22.3255 22.588 17.6929 22.588 11.9999C22.588 6.30695 17.9555 1.67441 12.2625 1.67441Z" fill="#292D32" />
                                            </svg>
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                            <button type="button" className="mobile-nav-button" onClick={toggleMobileNav}>
                                <span className={`mobile-nav-button__icon ${isMobileNavOpen ? 'active' : ''}`}></span>
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
            <div className={`mobile-nav ${isMobileNavOpen ? 'active' : ''}`}>

                <nav className="mobile-nav-list">
                    <ul>
                        <li><NavLink to="#!">Корзина</NavLink></li>
                        <li><NavLink to="#!">Профиль</NavLink></li>
                    </ul>
                </nav>
            </div>

        </>
    )
};

export default Header;