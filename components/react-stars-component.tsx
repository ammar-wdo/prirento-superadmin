"use client";

import ReactStars from "react-stars";

type Props = {
  rate: number;
};

const ReactStarsComponent = ({ rate }: Props) => {



  return (
    <ReactStars size={20} color2="gold" color1="gray" count={5} value={rate} edit={false}/>
  );
};

export default ReactStarsComponent;
