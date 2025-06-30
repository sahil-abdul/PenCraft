import React, { useEffect, useState } from "react";
import { PostCard, Container } from "../index";
import { useParams } from "react-router-dom";
import service from "../../appwrite/StorageConfig";

const AllPost = () => {
  const [post, setPost] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    service.getPosts().then((data) => {
      if (data) {
        setPost(data.documents);
      }
      
    });
  }, [slug]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap w-full">
          {post.map((data) => (
            <div key={data.$id} className="p-2 w-1/3">
              <PostCard {...data} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
