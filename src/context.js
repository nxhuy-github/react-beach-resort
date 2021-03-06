import React, { Component } from 'react'
import items from './data'
import Client from './Contentful'

const RoomContext = React.createContext()

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  }

  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResortExample"
      })
    } catch(error) {
      console.log(error)
    }
  }

  componentDidMount() {
    let rooms =  this.formatData(items)
    let featuredRooms = rooms.filter(room => room.featured === true)
    let maxPrice = Math.max(...rooms.map(item => item.price))
    let maxSize = Math.max(...rooms.map(item => item.size))
    this.setState({
      rooms, // ~ rooms: rooms (ES6)
      featuredRooms, // ~ featuredRooms: featuredRooms (ES6)
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
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

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = event.target.name
    //console.log(event.type, value, name)
    this.setState({
      [name]:value
    }, this.filterRooms)
  }

  filterRooms = () => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets} = this.state
    let _rooms = [...rooms]
    capacity = parseInt(capacity)
    price = parseInt(price)
    minSize = parseInt(minSize)
    maxSize = parseInt(maxSize)

    if(type !== 'all') {
      _rooms = _rooms.filter(room => room.type === type)
    }

    if(capacity !== 1) {
      _rooms = _rooms.filter(room => room.capacity === capacity)
    }

    _rooms = _rooms.filter(room => room.price <= price)

    _rooms = _rooms.filter(room => room.size >= minSize && room.size <= maxSize)

    if(breakfast) {
      _rooms = _rooms.filter(room => room.breakfast === true)
    }

    if(pets) {
      _rooms = _rooms.filter(room => room.pets === true)
    }

    this.setState({
      sortedRooms: _rooms
    })
  }

  render() {
    return (
      <RoomContext.Provider value={{...this.state, getRoom: this.getRoom, handleChange: this.handleChange}}>
        {this.props.children}
      </RoomContext.Provider>
    )
  }
}

const RoomConsumer = RoomContext.Consumer

/**
 * HOC - Hight Order Component
 * @param {} Component 
 */
export function withRoomConsumer(Component){
  return function ConsumerWrapper(props){
    return <RoomConsumer>
      {value => <Component {...props} context={value} />}
    </RoomConsumer>
  }
}

export {RoomProvider, RoomConsumer, RoomContext}
