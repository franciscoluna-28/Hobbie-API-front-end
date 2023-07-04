import CategoriesDropdown from "./CategoriesDropdown";

export default function SearchBar() {
  return (
    <form className="flex justify-center items-center w-8/12 py-8 my-4 gap-4 min-w-full">
     <CategoriesDropdown/>
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          className="block p-5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search Activities..."
          required
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-5 text-sm font-medium text-white bg-main rounded-r-lg border border-main hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}
