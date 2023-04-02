import React, { useContext, useEffect } from 'react'
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Home.css'
import { Container } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import CategoryList from '../components/CategoryList';
import { fetchCategorys } from '../http/categoryAPI';

const Home = observer(() => {
    const { category } = useContext(Context);

    useEffect(() => {
        fetchCategorys().then(data => category.setCategorys(data));
    }, []);

    return (
        <>
            <div className='container-page'>
                <Header />

                <main className='main'>
                    <div className='home'>
                        <Container>
                            <div className='home__inner'>
                                <h2 className='home__title'>Каталог товаров</h2>
                                <CategoryList />
                            </div>
                        </Container>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    )
})

export default Home;