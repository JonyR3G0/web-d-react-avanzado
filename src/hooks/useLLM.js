import axios from 'axios'

export const useLLM = () => {
  // Funcion asincrona para manejar la peticion con axios
  const handleQuestion = async (userPrompt) => {
    const res = await axios.post('http://localhost:3003/api/generate', { userPrompt })
    return res
  }
  return { handleQuestion }
}
