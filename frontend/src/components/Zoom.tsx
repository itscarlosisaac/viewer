import React, { ChangeEvent } from 'react'
import { ZoomContext } from '../context'

export const Zoom = (): JSX.Element => {
  const { zoom,setZoom } = React.useContext(ZoomContext)

  const handleChange = (event: ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    setZoom(target.value)
  }

  return (
    <div className="app__zoom__manager">
      <div className="zoom__out"> - </div>
      <input
        className="zoom__handler"
        onChange={handleChange}
        name="zoom"
        type="range"
        min="1"
        max="2"
        value={zoom}
        step="0.1"/>
      <div className="zoom__in"> + </div>
    </div>
  )
}
