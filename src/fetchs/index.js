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

export const registerNewPetiano = async (data) => {
  const response = axiosInstance.post("petianos/", data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Erro ao enviar os dados:', error);
    throw new Error('Falha ao enviar a solicitação.');
  });

  return response
}

export const deletePetiano = async (id) => {
  const response = await axiosInstance.delete(`petianos/delete/${id}`);
  return response.data;
}
