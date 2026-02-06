const BASE_URL = 'http://127.0.0.1:5000/api/posts'

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!res.ok) {
    let errorMessage = 'Request failed'
    try {
      const errorData = await res.json()
      errorMessage = errorData.message || errorMessage
    } catch {}
    throw new Error(`${res.status} - ${errorMessage}`)
  }

  return res.json() as Promise<T>
}

export const fetchPosts = (search?: string): Promise<any[]> =>
  apiFetch(search ? `${BASE_URL}?search=${encodeURIComponent(search)}` : BASE_URL)

export const fetchPostById = (id: number | string): Promise<any> =>
  apiFetch(`${BASE_URL}/${id}`)

export const createPost = (data: { title: string; content: string; user_id: number }): Promise<any> =>
  apiFetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const updatePost = (id: number | string, data: { title: string; content: string }): Promise<any> =>
  apiFetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })

export const deletePost = (id: number | string): Promise<any> =>
  apiFetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
