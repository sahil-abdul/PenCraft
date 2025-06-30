import { Button, Input, RTE, Select } from "../index";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import service from "../../appwrite/StorageConfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PostForm({ post }) {
  const previewUrl = post?.featuredImage
    ? service.getFilePrev(post.featuredImage)
    : null;

  const { control, watch, handleSubmit, register, setValue, reset, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post && post !== null) {
      const userFile =
        data.image && data.image.length > 0
          ? await service.uploadFile(data.image[0])
          : null;

      if (userFile && post.featuredImage) {
        service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.upadtePost(post.$id, {
        ...data,
        featuredImage: userFile ? userFile.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
      // }
    } else {
      const file = await service.uploadFile(data.image[0]);
      // console.log(file)
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await service.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .substring(0, 36)
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        content: post.content,
        status: post.status,
      });
    }

    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform, reset, post]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap my-2">
      <div className="w-2/3 px-2 bg-[#efe5dc] border rounded-3xl">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="slug :"
          placeholder="slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2 bg-[#f3d8c7] border rounded-3xl">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post !== null && (
          <div className="w-full mb-4">
            <img src={previewUrl} alt={post.title} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
