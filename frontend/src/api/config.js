const BASE_URL = import.meta.env.VITE_API_URL

export const callApi = async ({ url, method = 'GET', data = null, headers = {} }) => {
  const URL = BASE_URL + url

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...authHeader()
    }
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(URL, options)
  const responseData = await response.json()

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // auto logout if 401 response returned from api
      localStorage.removeItem('token')
      location.reload()
    }
  }

  return responseData
}

const authHeader = () => {
  const token = localStorage.getItem('token')
  if (!token) return {}
  return { Authorization: 'Bearer ' + token }
}
