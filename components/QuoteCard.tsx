"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  post: any; // FIXME: type
  handleTagClick: (tag: string) => void;
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
};

const QuoteCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: Props) => {
  const [copied, setCopied] = useState<String | Boolean>("");
  const handleCopy = (e:Event) => {
    const handleCopy = () => {
      setCopied(post.prompt);
      navigator.clipboard.writeText(post.prompt);
      setTimeout(() => setCopied(false), 3000);
    };
  }

  useEffect(() => {
    setTimeout(() => {
      setCopied("");
    }, 5000);
  }, [copied]);

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
            src={copied === post.quote ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt="copy icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.quote}</p>
      <p>{post.author}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={handleTagClick}>#{post.tag}</p>
    </div>
  );
};

export default QuoteCard;
