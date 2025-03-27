import type { Request, Response, NextFunction, RequestHandler } from "express";

// handles errors in our controller so we dont have to provide try catch in every controller
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<any>;

export const asyncWrapper = (fn: AsyncHandler): RequestHandler  => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  };
}