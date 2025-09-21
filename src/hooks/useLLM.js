import axios from 'axios'

export const useLLM = () => {
  // Funcion asincrona para manejar la peticion con axios
  const handleQuestion = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/chat', {
        model: 'deepseek-r1:1.5b',
        messages: [
          { role: 'user', content: userPrompt }
        ],
        stream: false
      })
      console.log(res.data.message.content)
      return res.data.message.content.replace(/<think>.*?<\/think>/gs, '')
    } catch (error) {
      console.log('error', error)
    }
  }
  return { handleQuestion }
}
