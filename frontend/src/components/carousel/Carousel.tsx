import React, { useContext, useEffect, useState} from 'react'
import { CarouselItem } from './CarouselItem'
import { CarouselContext } from '../../context'
import { calculateFileSize } from '../../utils/calculateSize'
import { Loading } from '../common/Loading';
import { useFetch } from '../../hooks/useFetch';
interface CarouselItemInterface {
  name: string,
  size: number,
  url: string,
  setUrl: string
}

const carouselInitialState: CarouselItemInterface = {
  name: "",
  size: 0,
  url: "",
  setUrl: ""
}
interface CarouselProps {
  downloadUrl: string,
  images: CarouselItemInterface[],
}

const sliderDataInitialState: CarouselProps  = {
  images: [],
  downloadUrl: ""
}

export const Carousel = () => {

  const [ active, setActive] = useState(0);
  const { setShowing, carouselDataUrl } = useContext(CarouselContext)

  const [state] = useFetch(carouselDataUrl, sliderDataInitialState );
  const { loading, data, error } = state;

  const [ activeImage, setActiveImage ] = useState<CarouselItemInterface>(carouselInitialState)

  const { images, downloadUrl } = data;

  useEffect(() => {
    setActiveImage(images[0])
  }, [state])

  const nextItem = () => {
    if (active === images.length - 1) {
      setActive(0)
      setActiveImage(images[0])
    } else {
      setActive(active + 1)
      setActiveImage(images[active + 1])
    }
  }

  const prevItem = () => {
    if (active === 0) {
      setActive(images.length  - 1)
      setActiveImage(images[images.length  - 1])
    } else {
      setActive(active - 1)
      setActiveImage(images[active - 1])
    }
  }

  const downloadSet = () => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.click();
  }

  const dismissCarousel = () => {
    setShowing(false)
    setActive(0)
  }


  if (error) {
    return <div> An Error occured while loading.</div>
  }


  if (loading) {
    return (
      <div className="app__carousel--loading">
        <Loading/>
      </div>
    )
  }

  return (
    <div className="app__carousel">
      <header className="app__carousel__header">
        <div className="close" onClick={dismissCarousel}></div>
      </header>
      <section className="app__carousel__inner">
        <div className="app__carousel__inner__slides">
          <div className="nav next" onClick={nextItem}> → </div>
          <div className="nav prev" onClick={prevItem}> ← </div>
          <div className="app__carousel__slides">
            {
              images.map((image: any, index: number) => {
                return (
                  <CarouselItem
                    name={image.name}
                    className={active === index ? 'active' : ''}
                    key={index}
                    imageUrl={image.url} />
                )
              })
            }
          </div>
        </div>
        <div className="app__carousel__bullets">
          {
            images.map(((image:any, index: number) =>
                <span key={index} className={`${active === index ? "active" : ""}`} ></span>
            ))
          }
        </div>
        <div className="app__carousel__meta">
          <p>{calculateFileSize(activeImage?.size)}</p>
          <h2>{activeImage?.name}</h2>
        </div>
      </section>
      <footer className="app__carousel__footer">
        <button onClick={downloadSet}>Download</button>
      </footer>
    </div>
  )
}
