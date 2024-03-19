import { type Request, type Response } from "express";

const error404= (_req:Request, res: Response)=>{

  return res.status(404).render("error", {
    title:"Error 404 Not found",
    message: "¡Oops! the resource does not exist"
  })
}

export default {
  error404
}
