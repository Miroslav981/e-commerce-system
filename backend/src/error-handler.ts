/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const handleError: ErrorRequestHandler = (
  error: Error,
  req?: Request,
  res?: Response,
  next?: NextFunction
): void => {
  if (res) {
    res.status(500).json({ message: error.message });
  }
  console.log(error);
};