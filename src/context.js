import React, { useState, useEffect, useContext } from 'react'

const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false) //用來抓取api時的畫面延遲設定
  const [trainData, setTrainData] = useState(null) //存放抓取到的api
  const [startStation, setStartStation] = useState('') //存放起站資訊
  const [endStation, setEndStation] = useState('') //存放迄站資訊，
  const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=1&$format=JSON`
  
  const handleClick= () => {
    setEndStation(document.getElementById('end').value)  /* 設endStation!! */
  }
  

    console.log('StartStation為', startStation)
    console.log('EndStation為', endStation)
 
    const getData = async () => {
    if(startStation === '' || endStation === ''){       /* 避免還未選站就抓資料!! */
      return
    }
    setLoading(true)
    try {
      const res = await fetch(url)
      const trainData = await res.json()
      setTrainData(trainData)
      setLoading(false)
      console.log("trainData為",trainData)
      trainData[0]['Fares'].map((item) => console.log('這是APP內的', item))
    } catch (error) {
      console.log('抓取api異常')
    }
  }
  useEffect(() => {
    getData()
  }, [endStation])

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        trainData,
        setTrainData,
        startStation,
        setStartStation,
        endStation,
        setEndStation,
        handleClick,
        url,
        getData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

//custom hook

export const useGlobalContext = () => {
  return useContext(AppContext)
}
export { AppContext, AppProvider }
