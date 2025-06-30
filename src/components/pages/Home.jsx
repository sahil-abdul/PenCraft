import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/StorageConfig";
import Container from "../conatainer/Conatainer";
import PostCard from "../card/PostCard";

function Home() {
  const [posts, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  // console.log(posts);

  useEffect(() => {
    service.getPosts().then((data) => {
      if (data) {
        setPost(data.documents);
      }
    });
  }, [slug]);

  if (posts.length !== 0) {
    return (
      <div className="py-8 w-full">
        <Container>
          <div className="flex flex-wrap ">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="w-full py-8 mt-4  text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                logIn to read the post
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
