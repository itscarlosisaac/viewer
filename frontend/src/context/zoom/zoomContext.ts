import {createContext} from 'react';

interface zoomContextInitialState {
  zoom: number;
  setZoom: Function;
}

const initialState: zoomContextInitialState = {
  zoom: 1.5,
  setZoom: () => {}
};

export const ZoomContext = createContext(initialState);
export const ZoomConsumer = ZoomContext.Consumer;
export const ZoomProvider = ZoomContext.Provider;

