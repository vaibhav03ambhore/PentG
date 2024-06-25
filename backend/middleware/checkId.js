import { isValidObjectId } from "mongoose";

export default (req, res, next) => {
    if (!isValidObjectId(req.params.id)) {
        res.status(400);
        throw new Error(`Invalid ObjectId: ${req.params.id}`);
    }
    next();
}