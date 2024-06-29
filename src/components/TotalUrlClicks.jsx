import { Link } from "react-router-dom";
function TotalUrlClicks({totalClicks,handleReset}) {

  return (
    <>
      <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-md p-4">
        <div className="flex flex-col gap-4 items-center justify-between w-full space-x-2">
          <span className="dark:text-gray-200 text-2xl">Total URL Clicks</span>
          <span className="dark:text-gray-200 font-semibold text-2xl">{totalClicks}</span>
        </div>
      </div>
      <div className="flex justify-end mt-4">
       <Link to="/"> <button className="px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-md border border-indigo-600 mr-2">
         
         Trim Another URL
       </button></Link>
        <button onClick={handleReset} className="px-2 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 border border-indigo-600">
        
          Track Other URL
        </button>
      </div>
    </>
  );
}

export default TotalUrlClicks;
