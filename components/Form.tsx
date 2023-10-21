import React from "react";
import type FormProps from "@/types/Form";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  return (
    <section className="w-full max-w-full flex-start flex-col -mt-10">
      <h1 className="head_text text-left blue_gradient">
        <span>{type} Quote</span>
      </h1>
      {type === "Create" && (
        <p className="desc">
          Unlock the transformative power of quotes and let them enrich your
          life in ways you never thought possible. Quotes are more than just
          words.
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-4 w-full max-w-3xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi text-base text-gray-600 font-semibold">
            Enter Quote
          </span>
          <textarea
            value={post.quote}
            onChange={(e) => setPost({ ...post, quote: e.target.value })}
            placeholder="Write your quote here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi text-base text-gray-600 font-semibold mb-2">
            Enter Author
          </span>
          <input
            value={post.author}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            placeholder="Write the name of the author here..."
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi text-base text-gray-600 font-semibold">
            Enter Tag{" "}
            <span className="font-normal">(#motivation #lifestyle)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">Cancel</Link>
          <button 
            type="submit" 
            className="px-5 py-1.5 bg-primary-orange text-white rounded-full text-sm font-semibold hover:opacity-80 active:bg-orange-600 transition-all duration-75 ease"
            disabled={submitting as boolean}
          >{submitting ? (`${type === "Create" ? ("Creating...") : ("Updating...")}`) : (`${type === 'Create' ? ("Create") : ("Update")}`)}</button>
        </div>
      </form>
    </section>
  );
};

export default Form;
