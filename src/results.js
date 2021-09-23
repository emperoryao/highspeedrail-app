import React from 'react'
import { useGlobalContext } from './context'


function Results() {
    const { trainData } = useGlobalContext()
    return (
      <>
        {trainData && (   /* 有抓到資料才跑 */
          <div>
            {/* 起始站 */}
            <h3>
              {trainData[0]['OriginStationName']['Zh_tw']}---
              {trainData[0]['DestinationStationName']['Zh_tw']}
            </h3>
            {/* 票價 */}
            {trainData[0]['Fares'].map((item, index) => {
              const { TicketType, Price } = item
              // console.log(TicketType, Price)
              return (
                <div key={index}>
                  <h3>
                    {TicketType}:${Price}
                  </h3>
                </div>
              )
            })}
          </div>
        )}
      </>
    )
}

export default Results
