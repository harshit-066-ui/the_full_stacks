import PostCard from './PostCard'

interface Props {
  posts: any[]
  onDelete: (id: number) => void
  onEdit: (id: number) => void
}

const PostList: React.FC<Props> = ({ posts, onDelete, onEdit }) => {
  if (posts.length === 0) {
    return <p style={{ color: '#666', fontStyle: 'italic' }}>No posts found.</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}

export default PostList