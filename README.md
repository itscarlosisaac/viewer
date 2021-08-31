## Part 1 (backend)

### Routes

  - api/list
  - api/list/:imageName
  - api/list/download/:imageGroup

  This one is to serve the images to be loaded by the App.
  - api/bucket/:set


## api/list
### response
Array of images [
  {
    name: string,
    url: string,
    size: number,
    setUrl: string,
  }
]

## api/list/:setId
### response
Set of 4 Images: [
  { name: string, url: string, size: number, setUrl: string},
  { name: string, url: string, size: number, setUrl: string},
  { name: string, url: string, size: number, setUrl: string},
  { name: string, url: string, size: number, setUrl: string}
]

When downloading only will zip one image.