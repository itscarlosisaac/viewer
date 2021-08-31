import React, { useEffect, useState } from 'react'

import { ProductItem } from './ProductItem'
import { Loading } from '../common/Loading';
import { useFetch } from '../../hooks/useFetch';

import { ZoomContext, CarouselContext } from '../../context';

import { rootUrl } from '../../config';

interface ProductListInterface {
  images: ProductItemProps[]
}

interface ProductItemProps {
  zoom: number;
  name: string,
  size: number,
  url: string
}

interface ProductStateInterface {
  isLoading: boolean,
  active: any,
  products: any,
  error: Error | null
}

export const ProductList = () => {


  const [state] = useFetch(rootUrl)

  const { loading, data, error } = state
  const [ active, setActive ] = useState<any>({})

  const { zoom } = React.useContext(ZoomContext)
  const { showing, setShowing, setCarouselUrl } = React.useContext(CarouselContext)

  useEffect(() => {
    if (!showing) { setActive({}) }
  }, [showing])

  const toogleCarousel = (data: any): void => {
    setShowing(true)
    setCarouselUrl(data.setUrl)
    setActive(data)
  }

  if (error) {
    return <div> An Error occured while loading.</div>
  }

  if (loading) {
    return (
      <div className="app__product__list--loading">
        <Loading/>
      </div>
    )
  }

  return (
    <div className="app__product__list">
      {
        data.map((product: any, index: number) => {
          return (
            <ProductItem
              activeClass={active?.name === product.name ? "active" : ""}
              toggleCarousel={() => toogleCarousel(product)}
              url={product.url}
              name={product.name}
              size={product.size}
              key={`${index}_${product.name}`}
              zoom={zoom} />
          )
        })
      }
    </div>
  )
}
