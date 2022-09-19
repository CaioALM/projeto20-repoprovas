import { Request, Response, NextFunction } from 'express';

export default function errorHandler(error, req: Request, res: Response, next: NextFunction) {
	const { code, message } = error;
  
  if(code === 'Invalid'){
    return res.status(422).send(message)
  }
  if(code === "Unauthorized"){
    return res.status(401).send(message)
  }
  if(code === "NotFound"){
    return res.status(404).send(message)
  }
  if(code === "Conflict"){
    return res.status(409).send(message)
  }
  if(code === "Forbidden"){
    return res.status(403).send(message)
  }
  console.log(message)
  return res.status(500).send('Internal server error')

}