import type { RequestHandler } from 'express';
export const createLog: RequestHandler = (req, res, next) => {
    res.on("finish", function () {
        console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    });
    next();
};