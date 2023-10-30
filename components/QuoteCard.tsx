"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Loading from '@/components/Loading';
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  post: any; // FIXME: type
  handleTagClick: React.MouseEventHandler<HTMLParagraphElement>
  setPosts: any
};

const QuoteCard = ({
  post,
  handleTagClick,
  setPosts,
}: Props) => {
  const { data : session, status } = useSession();
  const pathname = usePathname();
  const endingPathname = pathname.split("/")[pathname.split("/").length - 1];
  const [copied, setCopied] = useState<String | Boolean>("");
  const handleCopy: React.MouseEventHandler<HTMLDivElement> = async (e) => {
    setCopied(post.quote);
    await navigator.clipboard.writeText(post.quote);
    setTimeout(() => setCopied(false), 3000);
  }

  useEffect(() => {
    setTimeout(() => {
      setCopied("");
    }, 5000);
  }, [copied]);

  const handleDelete = async () => {
    console.log(post._id);
    const promise = new Promise((resolve, reject) => {
      axios.delete(`/api/quote/delete/${post._id}`).then((response) => {
        resolve(response.data);
        setPosts((prev: any) => (prev.filter((quote: any) => quote._id != post._id)))
      }).catch((err) => {
        reject(err);
      })
    });

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted successfully",
      error: "Something went wrong",
    });
  }

  const handleEdit = () => {
    console.log(post._id);
  }

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <div className="prompt_card ">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user avatar"
            width={40}
            height={40}
            className="rounded-full object-contain cursor-pointer"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.quote
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-lg font-semibold text-gray-700 overflow-x-scroll h-[40px]">
        "{post.quote}"
      </p>
      <p className="text-sm text-center font-light uppercase">~By {post.author}</p>
      {/* <p className="text-sm font-light">
        Tag:{" "}
        <span
          className="font-normal bg-blue-400 py-1 px-3 rounded-full hover:text-white cursor-pointer hover:bg-blue-500"
          onClick={handleTagClick}
        >
          #{post.tag}
        </span>
      </p> */}
      {session &&
        session?.user &&
        session?.user?.email === post.creator.email &&
        endingPathname === "profile" && (
          <div className="w-full flex justify-between">
            <div className="flex w-full py-2 justify-between">
              <button className="px-2 py-1 bg-slate-300 rounded-lg hover:bg-slate-400/60 duration-100 transition-all ease active:scale-95" onClick={handleEdit}>
                Edit
              </button>
              <button className="px-2 py-1 bg-slate-300 rounded-lg hover:bg-slate-400/60 duration-100 transition-all ease active:scale-95" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default QuoteCard;
