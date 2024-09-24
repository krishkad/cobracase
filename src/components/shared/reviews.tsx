import React from 'react';
import Phone from './phone';

function splitArray<T>(array: Array<T>, numParts: number) {
  const results: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!results[index]) {
      results[index] = [];
    }
    results[index].push(array[i]);

  }

  return results;
}

const Reviews = () => {
  const PHONE = [
    "/testimonials/1.jpg",
    "/testimonials/2.jpg",
    "/testimonials/3.jpg",
    "/testimonials/4.jpg",
    "/testimonials/5.jpg",
    "/testimonials/6.jpg",
  ];
  const results = splitArray(PHONE, 3);
  const column1 = results[0];
  const column2 = results[1];
  const column3 = results[2];

  return (

    <div className="w-full h-[calc(70vh)] md:h-[calc(80vh)] overflow-hidden">
      <div className="size-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="size-full flex flex-col items-center gap-y-8 ">
          {column1.map((phone, i) => {
            return <Phone SrcImg={phone} key={i} />
          })}
        </div>
        <div className="size-full hidden sm:flex flex-col items-center gap-y-8  transform -translate-y-52">
          {column2.concat(column2).map((phone, i) => {
            return <Phone SrcImg={phone} key={i} />
          })}
        </div>
        <div className="size-full hidden md:flex flex-col items-center gap-y-8 ">
          {column3.map((phone, i) => {
            return <Phone SrcImg={phone} key={i} />
          })}
        </div>
      </div>

    </div>
  )
}

export default Reviews;