import express from 'express'

const router = express.Router();

router.use('/', (req, res) => {
    res.send("This is a comments route");
})

export default router;