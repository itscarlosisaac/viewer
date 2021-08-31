## Setup Script
### Run `yarn install` to install all the dependencies main directory.

### Run `yarn setup` to install all the dependencies in the api and front end application
## Available Scripts

In the project directory, you can run:

### `yarn all`

Runs the front end and api server app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn start:front-end`
- Runs the front end only.
Note: The front end needs the api server to load the images.
### `yarn start:back-end`
- Runs the api server only.
## Part 1 (backend)

### Routes

  - api/list
  - api/list/:imageName
  - api/list/download/:imageGroup

This one is to serve the images to be loaded by the App.
  - api/bucket/:set


### api/list
Array of images [
  {
    name: string,
    url: string,
    size: number,
    setUrl: string,
  }
]

### api/list/:setId

Set of 4 Images:
```
[
  { name: string, url: string, size: number, setUrl: string},
  { name: string, url: string, size: number, setUrl: string},
  { name: string, url: string, size: number, setUrl: string},
  { name: string, url: string, size: number, setUrl: string}
]
```

### api/list/download/:setId
  - A .zip file containing 4 images.

## Part 2 (frontend)

- Show a list of the images loaded and on hover show the image name and filesize.
- On click on the image will load a carousel with 4 variations of the image with its respective filesize and name.
- On click on the close button will remove the active state in the previously selected image and will close the carousel.
- On click on the downlaod button will download a .zip file containing the 4 images from the carousel.