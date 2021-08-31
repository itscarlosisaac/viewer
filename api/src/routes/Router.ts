import path from 'path';
import { Router, Response, Request } from 'express';
import { DirectoryReader } from '../utils/';
import { rootUrl } from '../config';

const bucketUrl = path.join(__dirname, '../bucket');
const Reader = new DirectoryReader(bucketUrl)
const router = Router();

router.get('/list', (req: Request, res: Response) => {
  Reader.readList()
  res.json(Reader.data)
})

router.get('/list/:setId', (req: Request, res: Response) => {
  Reader.readList()
  const { setId } = req.params;
  const result = Reader.data.filter(set => set.name === setId)[0];

  const v1 = Object.assign({ }, result);
  v1.name = `${result.name} - V1`
  v1.size = 89831

  const v2 = Object.assign({ }, result);
  v2.name = `${result.name} - V2`
  v2.size = 8492

  const v3 = Object.assign({ }, result);
  v3.name = `${result.name} - V3`
  v3.size = 98312

  if (result !== undefined) {
    res.json({
      downloadUrl: `${rootUrl}/list/download/${setId}.svg`,
      images: [result, v1, v2, v3]
    })
    return;
  }
  res.status(404)
  res.send(`Set with Id:${setId} was not found.`)
})

router.get('/list/download/:setId', (req: Request, res: Response) => {
  const { setId } = req.params;
  const data = Reader.downloadSet(setId);
  if (data !== undefined) {
    res.set('Content-Type','application/octet-stream');
    res.set('Content-Disposition',`attachment; filename=${setId.replace("svg", "")}-set.zip`);
    res.set('Content-Length', `${data.length}` );
    res.send(data)
  } else {
    res.status(404)
    res.send(`Set with Id:${setId} was not found.`)
  }
})

export default router;