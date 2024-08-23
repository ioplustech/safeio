import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

class AxiosFetchWrapper {
  private readonly instance: AxiosInstance

  constructor (baseURL: string = '', timeout: number = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) =>
        // Uncomment the following lines if you want to use random User-Agent and X-Forwarded-For
        // config.headers['User-Agent'] = this.getRandomUserAgent();
        // config.headers['X-Forwarded-For'] = this.getRandomIP();
        config
      ,
      async (error: any) => await Promise.reject(error)
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      async (error: any) => {
        if (error.response) {
          console.error(
            'Response error:',
            error.response.status,
            error.response.data
          )
        } else if (error.request) {
          console.error('Request error:', error.request)
        } else {
          console.error('Error:', error.message)
        }
        return await Promise.reject(error)
      }
    )
  }

  private getRandomUserAgent (): string {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36'
    ]
    return userAgents[Math.floor(Math.random() * userAgents.length)]
  }

  private getRandomIP (): string {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(
      Math.random() * 256
    )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
  }

  async fetch<T = any>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await this.instance({
      url,
      ...options
    })
    return response as T
  }

  async get<T = any>(
    url: string,
    params?: any,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    return await this.fetch<T>(url, { ...options, method: 'GET', params })
  }

  async post<T = any>(
    url: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    return await this.fetch<T>(url, { ...options, method: 'POST', data })
  }

  async put<T = any>(
    url: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    return await this.fetch<T>(url, { ...options, method: 'PUT', data })
  }

  async delete<T = any>(url: string, options: AxiosRequestConfig = {}): Promise<T> {
    return await this.fetch<T>(url, { ...options, method: 'DELETE' })
  }
}

export default AxiosFetchWrapper
