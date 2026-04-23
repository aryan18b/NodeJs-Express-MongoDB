import express from 'express'

const router = express.Router();

router.use('/', (req, res) => {
    res.send("This is a users route");
})

export default router;