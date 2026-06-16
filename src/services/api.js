const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

async function parseResponse(response) {
  const text = await response.text()

  try {
    return JSON.parse(text)
  } catch (e) {
    console.error('Bad API response:', text)
    return []
  }
}
export async function apiRequest(path, options = {}) {
  const isFormData = options.body instanceof FormData
  const headers = isFormData
    ? { ...options.headers }
    : {
        'Content-Type': 'application/json',
        ...options.headers
      }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers,
    ...options
  })

  return parseResponse(response)
}

export function assetUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path

  const cleanValue = String(path).replace(/\\/g, '/').replace(/C:\/fakepath\//i, '')
  const hasDirectory = cleanValue.includes('/')
  const looksLikeFile = /\.[a-z0-9]+$/i.test(cleanValue)
  const cleanPath = cleanValue.startsWith('/')
    ? cleanValue
    : !hasDirectory && looksLikeFile
      ? `/uploads/${cleanValue}`
      : `/${cleanValue}`

  return `${API_BASE_URL}${cleanPath}`
}
