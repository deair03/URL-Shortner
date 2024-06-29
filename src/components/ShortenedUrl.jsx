import { useForm } from "react-hook-form";
import TotalUrlClicks from "./TotalUrlClicks";
import { useCallback, useState } from "react";
import { API_URLS } from "../constants/api-url.constant";

function ShortenedUrl() {
  const {
    register,
    handleSubmit, reset,
    formState: { errors },
  } = useForm();
const [totalUrlClicks, setTotalUrlClicks] = useState(null)
  const handleTotalClick = async (data) => {
    console.log(data.shortenedURL);
    const shortUrl = data.shortenedURL;
    const urlArray = shortUrl.split('/');
    const urlcode = urlArray.pop(); // takes the last item from array
    console.log(urlcode);
    await fetchAnalytics(urlcode);

  };

  const fetchAnalytics = useCallback(async(urlcode) => {
    const data = await fetch(`${API_URLS.prod}/analytics/${urlcode}`);
    const response = await data.json();
    setTotalUrlClicks(response);
    console.log(response);
  }, [])

  function handleReset(){
    reset();
    setTotalUrlClicks(null);
  }
  return (
    <form onSubmit={handleSubmit(handleTotalClick)}>
      <label
        htmlFor="long-url"
        className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
      >
        Shortened URL
      </label>
      <div className="relative">
        <input
          {...register("shortenedURL", { required: "URL missing" })}
          id="shortened-url"
          placeholder="Enter your shortened URL"
          className="block p-3 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:text-sm"
          type="text"
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 inline-flex items-center px-3 rounded-r-md border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 sm:text-sm"
        >
          Track clicks
        </button>
      </div>
      { (totalUrlClicks !== null) && <div>
        <TotalUrlClicks handleReset={handleReset} totalClicks = {totalUrlClicks}/>
      </div>}
    </form>
  );
}

export default ShortenedUrl;
