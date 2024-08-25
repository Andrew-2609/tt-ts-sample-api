import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

export const healthHandler = async (_req: Request, res: Response): Promise<void> => {
    res.sendStatus(StatusCodes.OK)
}