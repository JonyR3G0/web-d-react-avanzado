import axios from 'axios'

export const useLLM = () => {
  // Funcion asincrona para manejar la peticion con axios
  const handleQuestion = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'llama2',
        promt: userPrompt,
        stream: true
      })
      return res.data.response
    } catch (error) {
      console.log('error', error)
    }
  }
  return { handleQuestion }
}
