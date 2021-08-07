const express = require("express")
const router = express.Router()
const News = require("../models/news.js")

//GET
router.get("/", (req, res) => {
  News.find({}, (error, foundNews) => {
    res.json(foundNews)
  })
})

//DELETE
router.delete("/:id", (req, res) => {
  News.findByIdAndRemove(req.params.id, (error, deleteNews) => {
    res.json(deleteNews)
  })
})

//POST
router.post("/", (req, res) => {
  News.create(req.body, (error, createNews) => {
    res.json(createNews)
  })
})

//PUT(UPDATE)

router.put("/:id", (req, res) => {
  News.findByIdAndUpdate(req.params.id, req.body, {new:true},
  (error, updateNews) => {
    res.json(updateNews)
  })
})



module.exports = router
