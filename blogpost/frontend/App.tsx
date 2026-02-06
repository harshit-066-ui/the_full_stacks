import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetail from './pages/PostDetail'

function App() {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark')
    // Optional: save preference
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  // On load, respect saved preference or system preference
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Simple Blog</h1>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm font-medium"
            >
              {document.documentElement.classList.contains('dark') ? 'Light' : 'Dark'} Mode
            </button>
          </div>

          <nav className="flex gap-6 text-lg font-medium">
            <Link
              to="/"
              className="text-accent-blue dark:text-accent-green hover:text-accent-blue-hover dark:hover:text-accent-green-hover"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-accent-blue dark:text-accent-green hover:text-accent-blue-hover dark:hover:text-accent-green-hover"
            >
              Create Post
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App