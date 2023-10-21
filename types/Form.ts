import type Post from "./Post";

type FormProps = {
  type: "Create" | "Update";
  post: Post;
  setPost: React.Dispatch<React.SetStateAction<Post>>;
  submitting: Boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default FormProps;