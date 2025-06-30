import { Link } from "react-router-dom";
// import authUser from "../../appwrite/auth";
import service from "../../appwrite/StorageConfig";

function PostCard({ $id, title, featuredImage }) {
  // console.log(featuredImage)
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-[#f3d8c7] rounded-xl p-4 border">
        <div className="w-full flex justify-center mb-4">
          <img
            src={service.getFilePrev(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
