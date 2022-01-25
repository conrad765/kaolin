import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {  
  const [id, setId] = useState(1)
  const [nft, setNFT] = useState({})

  function getRank() {
     const headers = {
        'Content-Type': 'application/json',
     }
    setNFT({})
      axios.post('/api/token_by_id', { id },{headers})
        .then(res => {
          setNFT(res.data);
          console.log(res.data, 'res')
        })
      .catch(err=>console.log(err,'err'))
  }
  
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-800 p-6 py-2">
      <Head>
        <title>Rarity Checker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" ">
        <label className="text-white">Enter NFT ID:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => {
            setId(Number(e.target.value))
          }}
          className="m-4 mr-0 border border-black bg-gray-100 px-4 py-1 focus:outline-none"
          placeholder="123"
        />
        <button className="bg-black px-4 py-1 text-white" onClick={getRank}>Submit</button>
      </div>
      {nft ? (
        <div className="flex w-full flex-wrap justify-center bg-gray-200 p-6 md:w-6/12 lg:w-6/12">
          <div className="w-full lg:w-6/12">
            <div className="center mb-2">
              {nft.imageLink ? (
                <img width={300} height={300} src={nft.imageLink} />
              ) : (
                <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
            <div className="center flex-col">
              <h3 className="text-xl font-bold">{nft?.name}</h3>
              <div className="flex items-center">
                <p className="mr-2 mt-2 mb-4 bg-blue-300 px-4 py-1 text-sm font-medium text-blue-900">
                  Rank: {nft?.rank}
                </p>
                <p className="mr-2 mt-2 mb-4 bg-blue-300 px-4 py-1 text-sm font-medium text-blue-900">
                  Score: {Math.round(nft?.rarity_score)}
                </p>
              </div>
              <p>{nft?.description}</p>
            </div>
          </div>
          <div className="w-full lg:max-h-screen lg:w-6/12 lg:overflow-scroll">
            {/* <h3 className="text-xl font-bold text-center lg:text-left p-6">Attributes</h3> */}
            {nft?.attributes?.map((item) => {
              return (
                <div className="my-2 flex w-full items-center bg-blue-200 px-4 py-3 text-blue-900">
                  <p className="flex-1 font-medium">{item?.trait_type}</p>
                  <div className="flex-1">
                    <p>{item?.value}</p>
                    <p className="pt-3 text-sm">
                      {Math.round(item?.percentile * 100)}% chance
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  )
}
