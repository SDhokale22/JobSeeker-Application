import express from "express";
import { deleteJob, getAllJob, getMyJobs, postJob, singleJob, updateJob } from "../controller/jobController.js";
import { isAuthentication } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getAll", getAllJob);
router.post("/post", isAuthentication, postJob);
router.get("/myJobs", isAuthentication, getMyJobs);
router.put("/updateJob/:id", isAuthentication, updateJob);
router.delete("/deleteJob/:id", isAuthentication, deleteJob);
router.get("/:id", isAuthentication, singleJob);

export default router;