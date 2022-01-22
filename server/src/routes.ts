import { Router } from "express";
import { getDeepLinks } from "./index";

export const router = Router()

router.get('/', getDeepLinks)
