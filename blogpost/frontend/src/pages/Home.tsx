// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchPosts, deletePost } from '../api/posts'
import PostList from '../components/PostList'

const Home = () => {
  const [posts, setPosts] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const loadPosts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchPosts(search)
      setPosts(data || [])
    } catch (err: any) {
      setError(err.message || 'Failed to load posts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [search])

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return
    
    try {
      await deletePost(id)
      loadPosts() // refresh list
    } catch (err: any) {
      alert('Failed to delete post: ' + err.message)
    }
  }

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`)
  }

  return (
    <div className="space-y-6">
      {/* Search bar - Reddit style */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`
            w-full px-4 py-3 pl-10 rounded-md 
            bg-light-card dark:bg-dark-card 
            border border-light-border dark:border-dark-border 
            text-light-text dark:text-dark-text 
            placeholder:text-light-text-secondary dark:placeholder:text-dark-text-secondary
            focus:outline-none focus:ring-2 focus:ring-accent-blue dark:focus:ring-accent-green
            transition-all duration-200
          `}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent-blue dark:border-accent-green"></div>
          <p className="mt-3 text-light-text-secondary dark:text-dark-text-secondary">
            Loading posts...
          </p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 p-4 rounded-md">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Posts list */}
      {!loading && !error && (
        <>
          {posts.length === 0 ? (
            <div className="text-center py-16 text-light-text-secondary dark:text-dark-text-secondary">
              <p className="text-xl">No posts found</p>
              {search && (
                <p className="mt-2">
                  Try adjusting your search or create a new post
                </p>
              )}
            </div>
          ) : (
            <PostList
              posts={posts}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Home