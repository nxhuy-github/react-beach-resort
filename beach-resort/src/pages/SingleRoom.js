import React, { Component } from 'react'
import {RoomContext} from '../context'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends Component {
  state = {
    slug: this.props.match.params.slug
  }
  static contextType = RoomContext

  render() {
    const {getRoom} = this.context
    const room = getRoom(this.state.slug)
    console.log(room)
    if(!room) {
      return (
        <div className="error">
          <h3>no such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      )
    }
    const {name, description, capacity, size, price, extras, breakfast, pets, images} = room
    return (
      <>
        <StyledHero img={images[0]}>
          <Banner title={`${name} room`}>
            <Link to='/rooms' className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {images.map((img, idx) => {
              return <img key={idx} src={img} alt={name}/>
            })}
          </div>
        </section>
      </>
    )
  }
}
