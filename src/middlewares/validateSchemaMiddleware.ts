import { NextFunction, Response, Request } from "express";

export function validateSchemaMiddleware(schema) {
    return (req: Request, res: Response, next: NextFunction) => { 
      const { error } = schema.validate(req.body);
      if (error) {
        throw {code: "Invalid", message: error.details.map((e) => e.message )}
      
      }
      
      next();
    }
  }