import React from 'react'
import Header from '../components/Header'
import { Container } from 'react-bootstrap'
import UpdateProduct from '../components/adminOnly/UpdateProduct'
import Footer from '../components/Footer'

const AdminUpdateProduct = () => {
  return (
    <>
      <div className="container-page">
        <Header />
        <main className="main">
          <Container>
            <UpdateProduct />
          </Container>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default AdminUpdateProduct