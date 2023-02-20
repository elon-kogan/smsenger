const BACKEND_BASE_URL = process.env.REACT_APP_API_BASE_URL

interface GetRequestOptionsAttributes {
  method?: 'GET' | 'POST'
  endpoint: string
  payload?: Record<string, undefined | string | number | boolean | string[]>
}
interface RequestOptions {
  method: string
  headers: { [key: string]: string }
  body?: string
}
interface GetRequestOptions {
  (attrs: GetRequestOptionsAttributes): { url: URL; options: RequestOptions }
}

const getRequestOptions: GetRequestOptions = ({ method = 'GET', endpoint, payload = {} }) => {
  let url = new URL(`${BACKEND_BASE_URL}/${endpoint}`)

  const options: RequestOptions = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }

  if (method === 'GET')
    for (const key in payload) {
      const value = payload[key]
      if (Array.isArray(value)) value.forEach((v) => url.searchParams.append(key, v))
      else url.searchParams.append(key, String(value))
    }
  if (method === 'POST') options.body = JSON.stringify(payload)

  return { url, options }
}

const apiFetch = (url: URL, options: RequestOptions) =>
  fetch(url, options).then(async (response) => {
    if (response.ok) return response.json()
    else {
      const json: any = await response.json()
      throw new Error(json)
    }
  })

export { apiFetch, getRequestOptions }
