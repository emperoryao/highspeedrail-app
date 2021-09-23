import React from 'react'
import OriginStationID from './station'
import { useGlobalContext } from './context'

function Search() {
  const { startStation, setStartStation, setEndStation, setIsSending } =
    useGlobalContext()

    const handleRequest = ()=>{
      setIsSending(true)
    }

  return (
    <>
      <div>
        乘車起點:
        <select
          defaultValue={'DEFAULT'}
          onChange={(e) =>
            setStartStation(e.target.value)
          } /*設startStation!!  */
        >
          <option value='DEFAULT' disabled>
            請選擇
          </option>
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
        <select defaultValue={'DEFAULT'} onChange={(e) => setEndStation(e.target.value)}>
          <option value='DEFAULT' disabled>
            請選擇
          </option>
          {OriginStationID.map((end) => {
            const { station, id } = end
            return (
              <option
                key={id}
                value={id}
                disabled={id === startStation ? true : false}
              >
                {station}
              </option>
            )
          })}
        </select>
      </div>
      <button type='button' onClick={handleRequest}>查詢</button>
    </>
  )
}

export default Search
