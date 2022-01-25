import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {  
  const [id, setId] = useState(1)
  const [nft, setNFT] = useState({})

  useEffect(() => {
    if (id) {
      const headers = {
        'Content-Type': 'application/json',
      }
      axios.post('/api/token_by_id', { id },{headers})
        .then(res => {
          setNFT(res.data);
          console.log(res.data, 'res')
        })
      .catch(err=>console.log(err,'err'))
    }
  }, [id]);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800 py-2 w-full p-6">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" ">
        <label className="text-white">NFT ID:</label>
        <input
          type="number"
          value={id}
          onChange={(e) => {
            setId(Number(e.target.value))
            setNFT({})
          }}
          className="m-4 border border-black bg-gray-100 px-4 py-1 focus:outline-none"
          placeholder="123"
        />
      </div>
      {nft ? (
        <div className="flex flex-wrap bg-gray-200 p-6 w-full md:w-6/12 lg:w-6/12 justify-center">
          <div className="w-full lg:w-6/12">
            <div className="mb-2 center">
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
            <div className='center flex-col'>
              <h3 className="text-xl font-bold">{nft?.name}</h3>
              <div className="flex items-center">
                <p className="mr-2 mt-2 mb-4 bg-blue-300 px-4 py-1 text-sm font-medium text-blue-900">
                  Rank: {nft?.rank}
                </p>
                <p className="mr-2 mt-2 mb-4 bg-blue-300 px-4 py-1 text-sm font-medium text-blue-900">
                  Score: {Math.round(nft.rarity_score)}
                </p>
              </div>
              <p>{nft.description}</p>
            </div>
          </div>
          <div className="w-full lg:w-6/12 lg:max-h-screen lg:overflow-scroll">
            {/* <h3 className="text-xl font-bold text-center lg:text-left p-6">Attributes</h3> */}
            {
              nft.attributes.map(item => {
                return (
                  <div className="my-2 flex w-full bg-blue-200 px-4 py-3 text-blue-900 items-center">
                    <p className='flex-1 font-medium'>{item.trait_type}</p>
                    <div className='flex-1'>
                      <p>{item.value}</p>
                      <p className='pt-3 text-sm'>{Math.round(item.percentile*100)}% chance</p>
                    </div>
                  </div>
                )
              })
            }
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
