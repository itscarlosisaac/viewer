import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { ProductList } from '../components/product/ProductList'
import { Carousel } from '../components/carousel/Carousel'
import { ZoomProvider, CarouselProvider } from '../context'

export const Home = () => {
  const [zoom, setZoom] = useState<number>(1.5);
  const [showing, setShowing] = useState<boolean>(false);
  const [carouselDataUrl, setCarouselUrl] = useState<string>("")

  return (
    <ZoomProvider value={{ zoom, setZoom }}>
      <CarouselProvider value={{
        showing,
        setShowing,
        setCarouselUrl,
        carouselDataUrl,
      }} >
        <div>
          <Header />
          <main  className="app__page__home">
            <div className="app__page__home--list">
              <ProductList />
            </div>
            { showing && (
              <aside>
                <Carousel />
              </aside>
            )}
          </main>
          <Footer />
        </div>
      </CarouselProvider>
    </ZoomProvider>
  )
}
