import { Router } from "express";
import verifyTokenAnonymous from "../middleware/verifyTokenAnonymous.js";
import { deleteCode, getAllCodes, loadCode, saveCode } from "../controller/codeController.js";
import { verifyToken } from "../middleware/verifyToken.js";


export const compilerRouter = Router();

compilerRouter.post("/save" , verifyTokenAnonymous, saveCode);
compilerRouter.post("/load", verifyTokenAnonymous , loadCode);
compilerRouter.delete("/delete/:id" , verifyToken, deleteCode);
compilerRouter.put("/edit/:id", verifyToken, deleteCode);
compilerRouter.get("/get-all-codes" , getAllCodes);

