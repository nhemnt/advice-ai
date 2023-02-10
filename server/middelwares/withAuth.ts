import type { NextApiRequest, NextApiResponse } from 'next'
import { UnauthorizedError } from "../errors";

export const withAuth = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    const { authorization } = req.headers;
    const isValid = authorization === `Bearer ${process.env.API_SECRET_KEY}`
    if (!isValid) throw new UnauthorizedError();
    await handler(req,res)
}

