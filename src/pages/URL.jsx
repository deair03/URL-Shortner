import { useEffect, useState, useCallback } from "react";
import { Tooltip } from "react-tooltip";

function URL() {
  const [tableData, setTableData] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [hasPrevPage, setHasPrevPage] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [pageSize, setPageSize] = useState(8);
  const [copy, setCopy] = useState("Copy");
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchUrl = useCallback(async () => {
    try {
      const getUrl = await fetch(
        `http://localhost:5164/paged-urls?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );
      const urlRes = await getUrl.json();
      setTableData(urlRes.data);
      setPageIndex(urlRes.pageIndex);
      setTotalPage(urlRes.totalPages);
      setHasPrevPage(urlRes.hasPreviousPage);
      setHasNextPage(urlRes.hasNextPage);
      setPageSize(urlRes.pageSize);
    } catch (error) {
      console.error("Failed to fetch URLs:", error);
    }
  }, [pageIndex, pageSize]);

  const copyToClipboard = async (rowUrl) => {
    setSelectedRow(rowUrl.id);
    await navigator.clipboard.writeText(rowUrl.shortUrl);
    setCopy("Copied");
    setTimeout(() => {
      setCopy("Copy");
    }, 2000);
  };

  const previousPage = () => {
    setPageIndex((prev) => prev - 1);
  };

  const nextPage = () => {
    setPageIndex((prev) => prev + 1);
  };

  const onPageSelect = (e) => {
    setPageSize(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  return (
    <>
      <div className="flex-1 bg-gray-100 dark:bg-gray-800 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex mb-6 gap-1 justify-end">
            <form className=" w-full max-w-lg">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                  required
                />
                <button
                  type="submit"
                  className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-900 rounded-e-lg border border-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-indigo-700 dark:hover:bg-indigo-900 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </form>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-950">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 w-48">
                    Long URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Short URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Created On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-950 dark:divide-gray-700">
                {tableData.map((url) => (
                  <tr key={url.id}>
                    <td className="px-6 relative text-sm text-gray-900 dark:text-gray-200 py-4 whitespace-nowrap">
                      <div className=" overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer">
                        {url.id}
                      </div>
                    </td>
                    <td className="px-6 relative text-sm text-gray-900 dark:text-gray-200 py-4 whitespace-nowrap">
                      <div className="max-w-3xl overflow-hidden overflow-ellipsis whitespace-nowrap cursor-pointer">
                        <span data-tooltip-id={url.shortUrl}>
                          {" "}
                          {url.longUrl}
                        </span>
                      </div>
                      <Tooltip
                        id={url.shortUrl}
                        place="bottom"
                        content={url.longUrl}
                      />
                    </td>
                    <td className="px-6 relative text-sm text-gray-900 dark:text-gray-200 py-4 whitespace-nowrap">
                      <div className=" overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer">
                        {url.shortUrl}
                      </div>
                    </td>
                    <td className="px-6 relative text-sm text-gray-900 dark:text-gray-200 py-4 whitespace-nowrap">
                      <div className=" overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer">
                        {url.createdAt}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-500 dark:hover:text-indigo-400"
                      >
                        {url.id === selectedRow ? copy : "Copy"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end items-center space-x-4">
            <div>
              <select
                onChange={(e) => onPageSelect(e)}
                className=" bg-gray-50 text-sm rounded focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white  bg-transparent border border-gray-700 text-gray-500 px-2 py-1"
              >
                <option value="8">8</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div>
              <button
                onClick={previousPage}
                disabled={!hasPrevPage}
                className={
                  !hasPrevPage
                    ? "px-3 py-1 border border-gray-300 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                    : "px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                }
              >
                Previous
              </button>
            </div>
            <div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {`Page ${pageIndex} of ${totalPage}`}
              </span>
            </div>
            <div>
              <button
                onClick={nextPage}
                disabled={!hasNextPage}
                className={
                  !hasNextPage
                    ? "px-3 py-1 border border-gray-300 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                    : "px-3 py-1 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default URL;
