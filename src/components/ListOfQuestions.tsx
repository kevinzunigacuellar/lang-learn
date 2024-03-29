import { useState } from "react";
import { useMemo } from "react";

// List of questions creates the feed of questions on the home page
const ListOfQuestions = ({ posts: dbposts }: { posts: any }) => {
  const [posts, setPosts] = useState(dbposts);
  const [activeLanguage, setActiveLanguage] = useState("All");
  const uniqueLanguages = useMemo(
    () => ["All", ...new Set(dbposts.map((post: any) => post.post_language))],
    [dbposts]
  ) as string[];
  ``;
  // Filter the posts by language depending on the language selected in the sidebar
  const handleLanguageChange = (language: any) => {
    setActiveLanguage(language);
    if (language === "All") return setPosts(dbposts);
    setPosts(dbposts.filter((post: any) => post.post_language === language));
  };

  if (posts.length === 0)
    return (
      <div className="bg-white p-4 rounded-md grid grid-cols-1 place-items-center">
        <p className="text-xl font-semibold mb-2">No questions found 😭</p>
        <a
          className="text-violet-800 px-4 bg-violet-200 border border-transparent hover:border-violet-400 py-1 font-semibold rounded-md"
          href="/question/"
        >
          Add a new one
        </a>
      </div>
    );

  // The HTML for the list of questions
  return (
    <>
      <div className="flex gap-2 mb-4 overflow-x-auto sm:overflow-x-visible">
        {uniqueLanguages.map((language) => (
          <button
            key={language}
            className={`px-4 py-1 inline-block rounded border ${
              activeLanguage === language
                ? "bg-purple-200 border-purple-300"
                : "bg-white"
            }`}
            onClick={() => handleLanguageChange(language)}
          >
            {language}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post: any) => (
          <Question post={post} key={post.id} />
        ))}
      </div>
    </>
  );
};

// The HTML for each question
function Question({ post }: { post: any }) {
  return (
    <a
      href={`/question/${post.id}/`}
      className="flex flex-col gap-2 p-6 shadow items-baseline rounded-md bg-white hover:shadow-md transition-all"
    >
      <span className="inline-block px-2 bg-blue-200 text-xs uppercase font-medium text-blue-800 rounded">
        {post.post_language}
      </span>
      <p>{post.question}</p>
    </a>
  );
}

export default ListOfQuestions;
