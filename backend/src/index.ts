import * as functions from "firebase-functions";
import * as express from "express";
import { app } from "./server";

const server = express();

app(server)
  .then((nestApp) => {
    nestApp.init();
  })
  .catch();

export const api = functions.https.onRequest(server);
