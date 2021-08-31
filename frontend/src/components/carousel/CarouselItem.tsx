import React from 'react'

interface CarouselItemProps {
  imageUrl: string,
  className: string,
  name: string
}

export const CarouselItem = ({ imageUrl, className, name }: CarouselItemProps) => {
  return (
    <div className={`app__product__item ${className}`}>
      <img alt={name} width="300" src={`${imageUrl}`}  />
    </div>
  )
}
