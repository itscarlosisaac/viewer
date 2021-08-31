import {createContext} from 'react';

interface carouselContextInitialState {
  showing: boolean;
  setShowing: Function,
  carouselDataUrl: string,
  setCarouselUrl: any
}

const initialState: carouselContextInitialState = {
  showing: false,
  setShowing: () => { },
  carouselDataUrl: "",
  setCarouselUrl: () => { },
};

export const CarouselContext = createContext(initialState);
export const CarouselConsumer = CarouselContext.Consumer;
export const CarouselProvider = CarouselContext.Provider;

