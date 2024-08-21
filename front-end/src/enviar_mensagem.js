import axios from 'axios'

export async function EnviarMensagem(menssagem, session_id){
    console.log(menssagem)

    try {

        const payload = {
            message: menssagem
        };
        const response = await axios.post(`http://localhost:8000/chat/${session_id}`, payload)

        console.log("Mensagem enviada com sucesso")
        return response.data
    } catch (error) {
        console.error("Erro ao enviar mensagem: ", error.message)
    }

}

export async function IniciarChat(){
    try {
        const response = await axios.post(`http://localhost:8000/chat/`)
        console.log("Mensagem enviada com sucesso")
        return response.data
    } catch (error) {
        console.error("Erro ao enviar mensagem: ", error.message)
    }
}


export async function TodosChats(){
    try {
        const response = await axios.get(`http://localhost:8000/chat/`)
        console.log("Chats buscados!")
        return response.data
    }catch(error){
        console.error("Erro ao buscar chats: ", error.message)
        }
}

export async function BuscarChat(session_id){
    try {
        const response = await axios.get(`http://localhost:8000/chat/${session_id}`)
        console.log("Chat buscado!")
        return response.data
    } catch (error) {
        console.error("Erro ao buscar chat: ", error.message)
    }
}

export async function DeletarChat(session_id){
    try {
        const response = await axios.delete(`http://localhost:8000/chat/${session_id}`)
        console.log("Chat deletado")
        return response.data
    } catch (error) {
        console.error("Erro ao deletar: ", error.message)
    }
}


