import React from "react";
import data from '../data/products.json'


export default function Products() {

  const onClickViewDetail = (item) => {

    (window as any)?.zoaSdk?.getSessionInfo((data,error) => { 
      console.log(data)
    });



    (window as any)?.zoaSdk?.openModal({
      title: item.name,
      path: `/extension/${process.env.APP_ID}/products/${item.id}`,
      height: 800,
      width: 800
    });
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope font-bold text-4xl text-black mb-8 max-lg:text-center">
          Product list
        </h2>
        <div className="flex flex-row gap-8" style={{ display: "flex", gap: 12 }}>
          {data?.map(item => (
            <a className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500" key={item.id.toString()} onClick={() => onClickViewDetail(item)}>
              <div className="">
                <img src={item.imageUrl} alt="face cream image" className="w-full aspect-square" />
              </div>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">{item.name}</h6>
                  <h6 className="font-semibold text-xl leading-8 text-indigo-600">{item.price}</h6>
                </div>
                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">{item.categoryName}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}