import { Link } from "react-router-dom"
import useProjects from "../hooks/useProjects";
import useAuth from "../hooks/useAuth";
import ProjectBrowser from "./ProjectBrowser";

const Header = () => {

  const { handleProjectBrowser, signOutProjects } = useProjects();
  const { signOutAuth } = useAuth();

  const handleSignOut = () => {
    signOutProjects();
    signOutAuth();
    localStorage.removeItem("token");
  }
  

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 text-center font-black mb-5 md:mb-0">
            UpTask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              type="button"
              className="flex gap-2 font-bold text-gray-600 uppercase hover:text-gray-800 transition-all"
              onClick={handleProjectBrowser}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              Search
            </button>
            <Link
                to="/projects"
                className="flex gap-2 font-bold text-gray-600 uppercase hover:text-gray-800 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
              Projects
            </Link>

            <button 
                type="button"
                className="text-white text-sm bg-sky-600 hover:bg-sky-700 transition-colors p-3 rounded-md uppercase font-bold"
                onClick={handleSignOut}
            >Logout</button>

            <ProjectBrowser />
        </div>
      </div>
    </header>
  )
}

export default Header
