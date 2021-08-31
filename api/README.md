## Part 1 (backend)

Your mission is to build an API endpoints that will send populate the data needed for the Zoomed Out/In View
as well as the Selected Carousel view.

1. The first endpoint should send a list of objects that contain an image, the name, and the size in KB.

2. The second endpoint should send an object with 4 images that the user can carousel through, as well
as the name and size.

3. The third endpoint lets the user download the 4 images as a zip file.

To keep things simple, attached are Olympics Icons and names you can use.
For the carousel, API, use the same image but make them different colors for differentiation.

### Routes

  - api/list
  - api/list/:imageName
  - api/list/download/:imageGroup

This one is to serve the images to be loaded by the App.
  - api/bucket

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
  { name: string, url: string, size: number},
  { name: string, url: string, size: number},
  { name: string, url: string, size: number},
  { name: string, url: string, size: number}
]


# api/download/setId
Send a .zip file with all the images.