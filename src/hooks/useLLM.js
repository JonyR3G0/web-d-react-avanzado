import axios from 'axios'

export const useLLM = () => {
  // Funcion asincrona para manejar la peticion con axios
  const handleQuestion = async (prompt) => {
    const res = await axios.post('http://localhost:3003/api/generate', { prompt })
    return res
  }
  return { handleQuestion }
}
