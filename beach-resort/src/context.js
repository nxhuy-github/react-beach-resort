import React, { Component } from 'react'
import items from './data'

const RoomContext = React.createContext()

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true
  }

  componentDidMount() {
    let rooms =  this.formatData(items)
    let featuredRooms = rooms.filter(room => room.featured === true)
    this.setState({
      rooms, // ~ rooms: rooms (ES6)
      featuredRooms, // ~ featuredRooms: featuredRooms (ES6)
      sortedRooms: rooms,
      loading: false
    })
  }

  formatData(items) {
    let _items = items.map((item) => {
      let id = item.sys.id
      let images = item.fields.images.map(image => image.fields.file.url)
      let room = {...item.fields, images, id}
      return room
    })
    return _items
  }

  getRoom = (slug) => {
    let _rooms = [...this.state.rooms]
    const room = _rooms.find((room) => {
      return room.slug === slug
    })
    return room
  }

  render() {
    return (
      <RoomContext.Provider value={{...this.state, getRoom: this.getRoom}}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer

export function withRoomConsumer(Component){
  return function ConsumerWrapper(props){
    return <RoomConsumer>
      {value => <Component {...props} context={value} />}
    </RoomConsumer>
  }
}

export {RoomProvider, RoomConsumer, RoomContext}
