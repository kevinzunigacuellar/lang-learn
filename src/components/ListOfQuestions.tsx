import React, { useState } from "react";
import { useMemo } from "react";

// List of questions creates the feed of questions on the home page
const ListOfQuestions = ({ posts: dbposts }) => {
  const [posts, setPosts] = useState(dbposts);
  const [activeLanguage, setActiveLanguage] = useState("All");
  const uniqueLanguages = useMemo(
    () => ["All", ...new Set(dbposts.map((post) => post.post_language))],
    [dbposts]
  ) as string[];

  // Filter the posts by language depending on the language selected in the sidebar
  const handleLanguageChange = (language) => {
    setActiveLanguage(language);
    if (language === "All") return setPosts(dbposts);
    setPosts(dbposts.filter((post) => post.post_language === language));
  };

  // The HTML for the list of questions
  return (
    <div className="grid grid-cols-4 gap-4">
      <ul className="hidden sm:block fixed top-50 left-20">
        <h2 className="font-semibold mb-2">Languages</h2>
        <div className="flex flex-col gap-2">
          {uniqueLanguages.map((language) => (
            <button
              key={language}
              className={`px-4 py-4 inline-block rounded ${
                activeLanguage === language ? "bg-purple-200" : "bg-white"
              }`}
              onClick={() => handleLanguageChange(language)}
            >
              {language}
            </button>
          ))}
        </div>
      </ul>
      <div className="col-span-full sm:col-span-4 grid grid-cols-2 gap-2">
        {/* .map works like a for loop in Astro so a Question component is created for each question */}
        {posts.map((post) => (
          <Question post={post} key={post.post_id} />
        ))}
      </div>
    </div>
  );
};

// The HTML for each question
function Question({ post }) {
  let link = "/question/" + post.post_id;
  return (
    <a href={link} className="btn-97 flex flex-col gap-2 p-6 border items-baseline rounded-md">
      <span className="inline-block px-2 bg-blue-200 text-xs uppercase font-medium text-blue-800 rounded-md">
        {post.post_language}
      </span>
      <p>{post.question}</p>
    </a>
  );
}

export default ListOfQuestions;
