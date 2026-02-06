import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchPostById } from '../api/posts'

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const loadPost = async () => {
      try {
        const data = await fetchPostById(id)
        setPost(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!post) return <p>Post not found</p>

  return (
    <div>
      <h2>{post.title}</h2>
      <div style={{ margin: '16px 0', color: '#555' }}>
        By user {post.user_id} • {new Date(post.created_at).toLocaleString()}
      </div>
      <p style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{post.content}</p>

      <div style={{ marginTop: '32px' }}>
        <Link
          to={`/edit/${post.id}`}
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginRight: '12px',
          }}
        >
          Edit Post
        </Link>
        <Link to="/" style={{ color: '#1a73e8' }}>← Back to Home</Link>
      </div>
    </div>
  )
}

export default PostDetail