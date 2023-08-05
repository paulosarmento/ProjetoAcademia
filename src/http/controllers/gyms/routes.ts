import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { register } from "../users/register";
import { authenticate } from "../users/authenticate";
import { profile } from "../users/profile";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);
}
