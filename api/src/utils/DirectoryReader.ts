import path from 'path';
import fs, { statSync } from 'fs';
import AdmZip from 'adm-zip'
import { rootUrl } from '../config';

export interface ImageData {
  url: string
  size: number;
  name: string,
  setUrl: string
}

interface DownloadSet {
  [key: string]: Buffer
}

export class DirectoryReader {

  data: ImageData[] = [];
  downloadedFiles: DownloadSet = {}
  constructor( public directory: string ) { }

  readList(): void {
    try {
      const images = fs.readdirSync(this.directory, { encoding: 'utf8' })
      this.data = images.map((image) => this.readImageInfo(image, "svg"))
    } catch (err: any) {
      err.code === 'ENOENT' ?
        console.error('File not found!') :
        console.error(err)
    }
  }

  readImageInfo(image: string, imageExtension: string): ImageData {
    const size = statSync(`${this.directory}/${image}`).size;
    const name = image.replace(`.${imageExtension}`, "");
    return {
      name, size,
      url: `${rootUrl}/bucket/${name}.svg`,
      setUrl: `${rootUrl}/list/${name}`,
    }
  }

  downloadSet(imageSetName: string): Buffer | undefined {
    try {
      if (this.downloadedFiles[imageSetName] !== undefined) {
        return this.downloadedFiles[imageSetName]
      }
      const zip = new AdmZip();
      const url = path.join(this.directory, imageSetName)
      zip.addLocalFile(url,undefined, `1_${imageSetName}`)
      zip.addLocalFile(url,undefined, `2_${imageSetName}`)
      zip.addLocalFile(url,undefined, `3_${imageSetName}`)
      zip.addLocalFile(url,undefined, `4_${imageSetName}`)
      this.downloadedFiles[imageSetName] = zip.toBuffer();
      return this.downloadedFiles[imageSetName];
    } catch (err: any) {
      console.error(err)
    }
    return;
  }
}