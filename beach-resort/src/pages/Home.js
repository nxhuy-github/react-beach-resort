import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import Services from '../components/Services'

const Home = () => {
  return (
    <>
      <Hero>
        <Banner title="luxurious rooms" subtitle="deluxe rooms starting at $2999">
          <Link to='/rooms' className="btn-primary">
            Our rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
    </>
  )
}

export default Home
