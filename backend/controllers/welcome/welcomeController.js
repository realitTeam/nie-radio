// adminController.js
require("dotenv").config();

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Blog = require("../../models/blog/BlogModel");

//-------------------------------------------------------------------------------------------------------
const wAllBlogPosts = asyncHandler(async (req, res) => {
    const blog_posts = await Blog.find().lean();
    if (!blog_posts?.length) {
        return res.status(400).json({ message: 'No blog post is found.' });
    }
    res.json(blog_posts);
});

//-------------------------------------------------------------------------------------------------------
module.exports = {
    wAllBlogPosts
};