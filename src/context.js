import React, { useState, useEffect, useContext } from 'react'


const AppContext = React.createContext()
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false) //用來抓取api時的畫面延遲設定
  const [trainData, setTrainData] = useState(null) //存放抓取到的api
  const [startStation, setStartStation] = useState('') //存放起站資訊
  const [endStation, setEndStation] = useState('') //存放迄站資訊，
  const [isSending,setIsSending] = useState(false)  /* 查詢按鈕 */
  const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=1&$format=JSON`
  
    console.log('StartStation為', startStation)
    console.log('EndStation為', endStation)
    console.log('trainData為', trainData)
 
  const getData = async () => {
    if(startStation === '' || endStation === '' || isSending === false){       /* 避免還未選站就抓資料!! */
      return
    }
    setLoading(true)
    console.log('loading start');
    try {
      const res = await fetch(url)
      const trainData = await res.json()
      setTrainData(trainData)
      // trainData[0]['Fares'].map((item) => console.log('這是APP內的', item))
      setLoading(false)
      console.log('loading finish')
    } catch (error) {
      console.log('抓取api異常')
    }
  }
  useEffect(() => {
    getData()
    // 清空變數
    setIsSending(false)
    setStartStation('')
    setEndStation('')
  }, [isSending])

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
        url,
        getData,
        setIsSending,
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
