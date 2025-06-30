import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/StorageConfig";
import Container from "../conatainer/Conatainer";
import PostForm from "../Post-form/PostForm";

function EditPost() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((data) => {

        setPost(data);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}
export default EditPost;
