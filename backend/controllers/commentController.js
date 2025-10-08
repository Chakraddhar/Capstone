import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  const { text } = req.body;
  const comment = await Comment.create({
    text, video: req.params.videoId, user: req.user._id
  });
  res.status(201).json(comment);
};

export const editComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (comment) {
    comment.text = req.body.text;
    await comment.save();
    res.json(comment);
  } else res.status(404).json({ message: "Comment not found" });
};

export const deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (comment) {
    await comment.remove();
    res.json({ message: "Comment removed" });
  } else res.status(404).json({ message: "Comment not found" });
};
