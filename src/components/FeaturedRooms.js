import React, { Component } from 'react'
import {RoomContext} from '../context'
import Loading from './Loading'
import Room from './Room'
import Title from './Title'

export default class FeaturedRooms extends Component {
  static contextType = RoomContext

  render() {
    // const value = this.context
    // console.log('console log from FeaturedRooms: ', value)

    /**
     * get featuredRooms from this.context
     * and RENAME it to rooms
       const {featuredRooms:rooms} = this.context
       console.log(rooms)
     */
    let {featuredRooms, loading} = this.context
    featuredRooms = featuredRooms.map(ele => {
      return <Room key={ele.id} room={ele} />
    })

    return (
      <section className="featured-rooms">
        <Title title="featured rooms"/>
        <div className="featured-rooms-center">
          {loading ? <Loading/> : featuredRooms}
        </div>
      </section>
    )
  }
}
