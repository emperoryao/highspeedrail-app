import React from 'react'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Loading from './Loading'
import OriginStationID from './station'
import { AppContext, useGlobalContext } from './context'

function Search() {
  const {
    handleClick,
    startStation,
    endStation,
    setStartStation,
    setEndStation,
  } = useGlobalContext()
  return (
    <>
      <div>
        乘車起點:
        <select
          id='start'
          onChange={() =>
            setStartStation(document.getElementById('start').value)  /* 設startStation!! */
          }
        >
          {OriginStationID.map((start) => {
            const { station, id } = start
            return (
              <option key={id} value={id}>
                {station}
              </option>
            )
          })}
        </select>
      </div>
      <div>
        乘車終點:
        <select id='end'>
          {OriginStationID.map((end) => {
            const { station, id } = end
            if (id === startStation) {
              return (
                <option key={id} value={id} disabled>
                  {station}
                </option>
              )
            }
            return (
              <option key={id} value={id}>
                {station}
              </option>
            )
          })}
        </select>
      </div>
      <button onClick={handleClick}>查詢</button>
      <article></article>
    </>
  )
}

export default Search
