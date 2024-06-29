import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function URLForm({ onShorUrlClick, urlPresent }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(onShorUrlClick)}>
        <label
          htmlFor="long-url"
          className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
        >
          Long URL
        </label>
        <div className="relative">
          <input
            {...register("longURL", { required: "URL missing" })}
            id="long-url"
            placeholder="Enter your long URL"
            className="block p-3 border w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:border-indigo-500 dark:focus:ring-indigo-500 sm:text-sm"
            type="text"
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 inline-flex items-center px-3 rounded-r-md border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 sm:text-sm"
          >
            Shorten
          </button>
        </div>
        {errors.longURL && (
          <small className="text-red-400 ml-1">
            <span>{errors.longURL.message}</span>
          </small>
        )}
        {urlPresent?.statusCode === 400 && !errors.longURL && (
          <small className="text-red-400 ml-1">
            <span>
              {urlPresent.errorMessage}{" "}
              <Link to="/urls">
                <span className="font-bold cursor-pointer underline">
                  View existing URLs
                </span>
              </Link>
            </span>
          </small>
        )}
      </form>
    </>
  );
}

export default URLForm;