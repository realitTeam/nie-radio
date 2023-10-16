import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../components/welcome/layouts/Header";
import Footer from "../../components/welcome/layouts/Footer";

import "./home_blank.css";
import blogImg from "./nie2.jpg";
import { Link } from "react-router-dom";


const Blog = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const posts_data = await axios.get('/api/blogs');
      setPost(posts_data.data);
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <section className="blank_bg">
        <div className="container_blank">
          <div className="container">
            <div className="row">
              {
                post && post.map((post) => (
                  <div className="col-4 crd" key={post.id}>
                    <div class="card" >
                      <img src={blogImg} class="card-img-top" alt="..." />
                      <div class="card-body">
                        <h5 class="card-title">{post.post_title}</h5>
                        <p class="card-text">{post.post_description}</p>
                        <Link to="#" class=" btn-warning">Read More</Link>
                      </div>
                    </div>
                  </div>
                ))
              };
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
