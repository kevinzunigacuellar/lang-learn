import React, { useState } from "react";
import { useMemo } from "react";

const ListOfQuestions = ({ posts: dbposts }) => {
  const [posts, setPosts] = useState(dbposts);
  const [activeLanguage, setActiveLanguage] = useState("All");
  const uniqueLanguages = useMemo(
    () => ["All", ...new Set(dbposts.map((post) => post.post_language))],
    [dbposts]
  ) as string[];

  const handleLanguageChange = (language) => {
    setActiveLanguage(language);
    if (language === "All") return setPosts(dbposts);
    setPosts(dbposts.filter((post) => post.post_language === language));
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <ul className="hidden sm:block">
        <h3 className="font-semibold mb-2">Languages</h3>
        <div className="flex flex-col gap-2">
          {uniqueLanguages.map((language) => (
            <button
              key={language}
              className={`px-4 inline-block rounded ${
                activeLanguage === language ? "bg-blue-200" : "bg-white"
              }`}
              onClick={() => handleLanguageChange(language)}
            >
              {language}
            </button>
          ))}
        </div>
      </ul>
      <div className="col-span-full sm:col-span-3 grid grid-cols-1 gap-3">
        {posts.map((post) => (
          <Question post={post} key={post.post_id} />
        ))}
      </div>
    </div>
  );
};

function Question({ post }) {
  let link = "/question/" + post.post_id;
  return (
    <a href={link}>
    <article href={link} className="flex flex-col gap-2 p-6 border items-baseline rounded-md">
      <span className="inline-block px-2 bg-blue-200 text-xs uppercase font-medium text-blue-800 rounded-md">
        {post.post_language}
      </span>
      <p>{post.question}</p>
    </article>
    </a>
  );
}

export default ListOfQuestions;
