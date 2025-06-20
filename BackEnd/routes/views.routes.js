import express from "express";
const router = express.Router();

router.get("/edicion-admin", (req, res) =>{
    res.render("edicionAdmin");
});

export default router;