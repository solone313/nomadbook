const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

//=================================
//             comment
//=================================

router.post("/saveComment", (req, res) => {
  if (!req.body.writer)
    return res.json({ success: false, err: "로그인이 필요합니다." });

  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});

router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.bookId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

router.post("/getBookscore", (req, res) => {
  Comment.find({ postId: req.body.bookId }).exec((err, books) => {
    average = books.reduce((sum, { rating }) => sum + rating, 0) / books.length;

    // console.log(average.toFixed(2));

    if (err) return res.status(400).send(err);
    if (books.length === 0)
      return res.status(200).json({ success: true, rating: "0" });
    res
      .status(200)
      .json({ success: true, rating: average.toFixed(2), count: books.length });
  });
});

module.exports = router;
