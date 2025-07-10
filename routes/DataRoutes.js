import express from "express"; 
const DataRoutes = express.Router()

import DataControllers from "../controllers/DataControllers.js";

DataRoutes.get("/getdata",DataControllers.getAll)
DataRoutes.post("/register", DataControllers.register)
DataRoutes.post("/login", DataControllers.login);

export default DataRoutes;