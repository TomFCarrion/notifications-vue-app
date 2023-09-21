import { ref } from 'vue'
import axios from 'axios'

import type { Ref } from 'vue'
import type { AxiosError, AxiosResponse, Method } from 'axios'

export function useAxios<T>(
  url: string,
  method: Method = 'GET'
): {
  data: Ref<T | null>
  error: Ref<string | null>
  isLoading: Ref<boolean>
  fetchData: (postData?: any) => Promise<void>
} {
  const data = ref<T>() as Ref<T>
  const error = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  const fetchData = async (postData?: any) => {
    isLoading.value = true
    try {
      let response: AxiosResponse<T>

      if (method === 'GET') {
        response = await axios.get<T>(url)
      } else if (method === 'POST') {
        response = await axios.post<T>(url, postData)
      } else {
        throw new Error('Unsupported HTTP method')
      }

      data.value = response.data
      error.value = null // Reset error
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError
        if (axiosError.response) {
          error.value = `Request failed with status ${axiosError.response.status}`
        } else if (axiosError.request) {
          error.value = 'No response received from the server'
        } else {
          error.value = 'An error occurred while processing the request'
        }
      } else {
        error.value = 'An error occurred'
      }
    } finally {
      isLoading.value = false
    }
  }

  fetchData() // Automatically fetch data when the component using this hook is mounted

  return {
    data,
    error,
    isLoading,
    fetchData
  }
}
