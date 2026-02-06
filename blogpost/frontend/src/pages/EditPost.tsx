import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm'
import { fetchPostById, updatePost } from '../api/posts'

const EditPost = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<{ title: string; content: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadPost = async () => {
      try {
        const data = await fetchPostById(id)
        setPost({ title: data.title, content: data.content })
      } catch (err: any) {
        setError(err.message || 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [id])

  const handleSubmit = async (data: { title: string; content: string }) => {
    if (!id) return
    setDisabled(true)
    setError(null)
    try {
      await updatePost(id, data)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Failed to update post')
    } finally {
      setDisabled(false)
    }
  }

  if (loading) return <p>Loading post...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!post) return <p>Post not found</p>

  return (
    <div>
      <h2>Edit Post</h2>
      <PostForm initialData={post} onSubmit={handleSubmit} disabled={disabled} />
    </div>
  )
}

export default EditPost