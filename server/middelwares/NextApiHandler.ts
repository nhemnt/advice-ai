import { ApplicationError, MethodNotAllowed } from "../errors";
import Joi from "joi";
import type { NextApiRequest, NextApiResponse } from 'next'


// takes care to call controllers on given method and handler errors
export const NextApiHandler =
  ({ get, post, patch, deleteController }: any) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      switch (req.method) {
        case "GET":
          if (!get) throw new MethodNotAllowed();
          await get(req, res);
          break;
        case "POST":
          if (!post) throw new MethodNotAllowed();
          await post(req, res);
          break;
        case "PATCH":
          if (!patch) throw new MethodNotAllowed();
          await patch(req, res);
          break;
        case "DELETE":
          if (!deleteController) throw new MethodNotAllowed();
          await deleteController(req, res);
          break;
        default:
          throw new MethodNotAllowed();
      }
    } catch (e: any) {
      // manually thrown by us
      if (e instanceof ApplicationError) {
        res.status(e.code).send(e.message);
        return;
      }
      // joi schema validtaion error
      if (e instanceof Joi.ValidationError) {
        return res.status(400).json({
          error: "Validation Error",
          message: e.message,
          details: e.details,
        });
      }

      // unknown error
      console.error(e);
      res.status(500).send("Internal Server Error");
    }
  };
