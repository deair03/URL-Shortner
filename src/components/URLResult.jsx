import { Link } from "react-router-dom";
function URLResult({ viewShortUrl, textCopied, copy, icon }) {
  return (
    <>
      <h3 className="text-xl dark:text-white">Your Short URL's</h3>
      <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-md p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-full space-x-2">
            <a className="text-indigo-600 dark:text-indigo-400 font-medium">
              {viewShortUrl.shortUrl}
            </a>
            <button
              onClick={textCopied}
              className="inline-flex gap-2 items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
              {icon}
              {copy}
            </button>
          </div>
        </div>
      </div>
      <div>
        <Link to={"/analytics"}>
          <a className=" mt-2 hover:underline cursor-pointer text-sm flex justify-end text-[#818cf8]">
            Track the total clicks for your url
          </a>
        </Link>
      </div>
    </>
  );
}

export default URLResult;
