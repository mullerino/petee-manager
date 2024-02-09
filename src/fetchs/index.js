import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://peteedeploy-api.onrender.com/api/'
})

export const fetchProjects = async () => {
  const { data } = await axiosInstance.get("projetos/")

  return data
}

export const fetchAreas = async () => {
  const { data } = await axiosInstance.get("areas/")

  return data
}

export const fetchPetianos = async () => {
  const { data } = await axiosInstance.get("petianos/")

  return data
}
