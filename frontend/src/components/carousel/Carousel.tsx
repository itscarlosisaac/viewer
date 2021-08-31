import React, { useContext, useEffect, useState} from 'react'
import { CarouselItem } from './CarouselItem'
import { CarouselContext } from '../../context'
import { calculateFileSize } from '../../utils/calculateSize'

interface CarouselItemInterface{
  name: string,
  size: number,
  url: string,
  setUrl: string
}

const carouselInitialState = {
  name: "",
  size: 0,
  url: "",
  setUrl: ""
}

interface CarouselProps {
  items?: CarouselItemInterface[],
}

export const Carousel = (props: CarouselProps) => {

  const [ active, setActive] = useState(0);
  const [ isLoading, setLoading] = useState<boolean>(false);
  const { setShowing, carouselDataUrl } = useContext(CarouselContext)

  const [ activeImage, setActiveImage] = useState<CarouselItemInterface>(carouselInitialState)

  const [ sliderData, setSliderData] = useState<any>({
    images: [],
    downloadUrl: ""
  })

  const { images, downloadUrl } = sliderData;

  useEffect(() => {
    setLoading(true)
    fetch(carouselDataUrl)
      .then(data => data.json())
      .then(images => {
        setSliderData({
          images: images.data,
          downloadUrl: images.downloadUrl
        })
        setActiveImage(images.data[0])
        setLoading(false)
      }).catch(e => console.error(e) )
  }, [carouselDataUrl])


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
    setSliderData({ })
    setActive(0)
  }

  return (
    <div className="app__carousel">
      <header className="app__carousel__header">
        <button className="close" onClick={dismissCarousel}>CLOSE</button>
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
          <p>{calculateFileSize(activeImage.size)}</p>
          <h2>{activeImage.name}</h2>
        </div>
      </section>
      <footer className="app__carousel__footer">
        <button onClick={downloadSet}>Download</button>
      </footer>
    </div>
  )
}
