import React, {useContext} from 'react'
import {RoomContext} from '../context'
import Title from './Title'

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
  const context = useContext(RoomContext)
  //console.log(context)
  const {
    handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets
  } = context
  let types = getUnique(rooms, 'type')
  types = ['all',...types]
  types = types.map((item, idx) => {
    return <option key={idx} value={item}>{item}</option>
  })
  let people = getUnique(rooms, 'capacity')
  people = people.map((item, idx) => {
    return <option key={idx} value={item}>{item}</option>
  })
  return (
    <section className="filter-container">
      <Title title="search rooms"/>
      <form className="filter-form">
        {/*select type*/}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select name="type" id="type" value={type} className="form-control" onChange={handleChange}>
            {types}
          </select>
        </div>
        {/*end select type*/}
        {/*select guests*/}
        <div className="form-group">
          <label htmlFor="capacity">Guests</label>
          <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChange}>
            {people}
          </select>
        </div>
        {/*end select guests*/}
      </form>
    </section>
  )
}
