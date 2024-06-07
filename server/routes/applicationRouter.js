import express from "express";
import { employerGetAllApplication, jobSeekerDeleteApplication, jobSeekergetAllApplication, postApplication } from "../controller/applicationController.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.get("/employer/getAll",isAuthentication, employerGetAllApplication);
router.get("/jobSeeker/getAll",isAuthentication, jobSeekergetAllApplication);
router.delete("/delete/:id",isAuthentication, jobSeekerDeleteApplication);
router.post("/post",isAuthentication, postApplication);

export default router;