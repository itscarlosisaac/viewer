import React from 'react'
import { calculateFileSize } from '../../utils/calculateSize'

interface ProductItemProps {
  zoom: number;
  name: string,
  size: number,
  url: string,
  toggleCarousel: (event: any) => void,
  activeClass: string
}

export const ProductItem = (props: ProductItemProps) => {
  const { name, size, zoom, url,toggleCarousel, activeClass } = props;
  const style = {
    maxWidth: zoom * 150+ "px",
    maxHeight: zoom * 150 + "px",
    width: "100%",
    height: "100%",
  }
  return (
    <div className={`app__product__list__item ${activeClass}` } style={style} onClick={toggleCarousel}>
      <p className="item__weight">{calculateFileSize(size)}</p>
      <img src={url} alt="logo"/>
      <p className="item__name">{name}</p>
    </div>
  )
}
