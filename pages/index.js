import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Home() {  
  const [id, setId] = useState("")
  const [nft, setNFT] = useState({})

  function getRank() {
     const headers = {
        'Content-Type': 'application/json',
     }
    setNFT({})
      axios.post('/api/token_by_id', { id:id?id:"0" },{headers})
        .then(res => {
          setNFT(res.data);
          console.log(res.data, 'res')
        })
      .catch(err=>console.log(err,'err'))
  }

  useEffect(() => {
    getRank();
  }, []);
  
  
  return (
    <div className="homepage relative h-screen p-6">
      <img
        src="bg.webp"
        style={{ zIndex: '-5', objectFit: 'cover', height: '100vh' }}
        className="fixed top-0 bottom-0 left-0 right-0"
      />
      <div className="center top-0 left-0 lg:fixed">
        <img
          width={200}
          src="logo.png"
          style={{ zIndex: '-3', objectFit: 'cover' }}
        />
      </div>
      <Head>
        <title>Rarity Checker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="navbar center  py-6">
        <div className="my-6 flex justify-end">
          <input
            type="number"
            value={id}
            onChange={(e) => {
              setId(e.target.value)
            }}
            className=" mr-0 border border-black bg-gray-100 px-4 py-1 focus:outline-none"
            placeholder="Enter NFT ID"
          />
          <button className="bg-black px-4 py-1 text-white" onClick={getRank}>
            Submit
          </button>
        </div>
      </div>
      {nft ? (
        <section className="content flex flex-wrap justify-between items-center">
          <div className="left center lg:left w-full shadow p-6 text-center lg:w-4/12">
            <div>
              <div className="center">
                <img className='border-2 border-gray-500' width={350} src={nft?.imageLink} />
              </div>
              <div className="pt-2 text-2xl font-bold">Rank: {nft?.rank}</div>
              <p className="pb-4 text-xl font-medium">
                Score: {Math.round(nft?.rarity_score)}
              </p>
              <p className="font-medium">{nft?.description}</p>
            </div>
          </div>
          <div className="right h-auto lg:h-96 w-full overflow-y-scroll p-2 lg:w-7/12">
            <h3 className="text-xl font-bold">{nft?.name}</h3>
            {nft?.attributes?.map((item) => {
              return (
                <div className="my-2 flex w-full items-center bg-blue-200 px-4 py-3 text-blue-900">
                  <p className="flex-1 font-medium">{item?.trait_type}</p>
                  <div className="flex-1">
                    <p>{item?.value}</p>
                    <p className="pt-3 text-sm">
                      {Number(item?.percentile).toFixed(2)}% chance
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
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


//  {
//    nft ? (
//      <div className="flex h-96 w-full flex-wrap justify-center bg-gray-200 p-6 md:w-6/12 lg:w-6/12">
//        <div className="w-full lg:w-6/12">
//          <div className="center mb-2">
//            {nft.imageLink ? (
//              <img width={300} height={300} src={nft.imageLink} />
//            ) : (
//              <div className="lds-ring">
//                <div></div>
//                <div></div>
//                <div></div>
//                <div></div>
//              </div>
//            )}
//          </div>
//          <div className="center flex-col">
          //  <h3 className="text-xl font-bold">{nft?.name}</h3>
//            <div className="flex items-center">
//              <p className="mr-2 mt-2 mb-4 bg-blue-300 px-4 py-1 text-sm font-medium text-blue-900">
//                Rank: {nft?.rank}
//              </p>
            //  <p className="mr-2 mt-2 mb-4 bg-blue-300 px-4 py-1 text-sm font-medium text-blue-900">
            //    Score: {Math.round(nft?.rarity_score)}
            //  </p>
//            </div>
//            <p>{nft?.description}</p>
//          </div>
//        </div>
//        <div className="w-full lg:max-h-screen lg:w-6/12 lg:overflow-scroll">
//          {/* <h3 className="text-xl font-bold text-center lg:text-left p-6">Attributes</h3> */}
        //  {nft?.attributes?.map((item) => {
        //    return (
        //      <div className="my-2 flex w-full items-center bg-blue-200 px-4 py-3 text-blue-900">
        //        <p className="flex-1 font-medium">{item?.trait_type}</p>
        //        <div className="flex-1">
        //          <p>{item?.value}</p>
        //          <p className="pt-3 text-sm">
        //            {Math.round(item?.percentile * 100)}% chance
        //          </p>
        //        </div>
        //      </div>
        //    )
        //  })}
//        </div>
//      </div>
//    ) : (
    //  <div className="lds-ring">
    //    <div></div>
    //    <div></div>
    //    <div></div>
    //    <div></div>
    //  </div>
//    )
//  }