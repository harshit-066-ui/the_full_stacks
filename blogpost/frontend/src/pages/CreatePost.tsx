import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import { createPost } from '../api/posts'

const CreatePost = () => {
  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data: { title: string; content: string }) => {
    setDisabled(true)
    setError(null)
    setSuccess(false)

    const payload = {
      ...data,
      user_id: 1, 
    }

    console.log('Submitting post with payload:', payload)

    try {
      await createPost(payload)
      setSuccess(true)
      setTimeout(() => {
        navigate('/')
      }, 1500)
    } catch (err: any) {
      console.error('Create post failed:', err)
      setError(
        err.message?.includes('foreign key')
          ? 'User not found. Make sure user id 1 exists in database.'
          : err.message || 'Failed to create post. Is the backend running?'
      )
    } finally {
      setDisabled(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
        Create New Post
      </h2>

      {success && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 dark:border-green-400 rounded-md text-green-700 dark:text-green-300">
          Post created successfully! Redirecting...
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 dark:border-red-400 rounded-md text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <PostForm 
        onSubmit={handleSubmit} 
        disabled={disabled} 
      />

      <p className="mt-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">
        Note: Currently posting as user id 1 (testcase). Users will be added later with authentication.
      </p>
    </div>
  )
}

export default CreatePost
