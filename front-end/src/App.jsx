import './App.css';
import {BuscarChat, EnviarMensagem, IniciarChat, TodosChats, DeletarChat} from './enviar_mensagem';
import { useEffect, useState } from 'react';

function App() {
  const[chats, setChats]= useState([])
  var [sessionId, setSessionId] = useState(null);
  var [menssagens, setMenssagens] = useState([])
  

  return (
    <div className='conteudo'>
      <aside>
      <EscolherChat onSelectChat={setSessionId} setMessages={setMenssagens} chats={chats} setChats={setChats}/>
      <NovoChat menssagens={setMenssagens} session_id={setSessionId} setChats={setChats} chats={chats}/>
      </aside>
      <main>
        <section>
          <Chat session_id={sessionId} menssagens={menssagens} setMenssagens={setMenssagens}></Chat>
          
        </section>
      </main>
    </div>
  );
}

function EscolherChat({ onSelectChat, setMessages, chats, setChats }) {
  
  
  useEffect(() => {
    async function fetchChats(){
      try{
        const result = await TodosChats();
        setChats(result);
      }catch(e){
        console.error('Error:', e);
      }
    }
    fetchChats();

  },[]);

  async function trocarMenssagens(sessionId){
    const menssagens_novo_chat = await BuscarChat(sessionId);
    setMessages(menssagens_novo_chat[0]['message'])
    setTimeout(scrollBottom, 90);
    setOpacity()
  }


  return (
    <div className='barraLateral'>
      <h2>Chats</h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat['chat']} onClick={() => {onSelectChat(chat['chat']) 
          trocarMenssagens(chat['chat'])}}>
            Chat {chat.chat.slice(0,7)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function NovoChat({menssagens, session_id, setChats, chats}){

  async function IniciarNovoChat(){
    const menssagens_novo_chat = await IniciarChat();
    session_id(menssagens_novo_chat[0]['session_id']);
    menssagens(menssagens_novo_chat[0]['message'])
    var newChat=[...chats, {'chat':menssagens_novo_chat[0]['session_id']}]
    setChats(newChat)

    setOpacity()
  }

  return(
    <div className='novoChat'>
      <button onClick={IniciarNovoChat}>Novo Chat</button>
    </div>
  )
}

function InputGroup({session_id, setMenssagens, mensagens}){

  var [value, setValue]= useState('')
  var menssagem=value;
  async function handleSendMessage() {
    setValue('')
    const newMessages=[...mensagens,{'type':'human', 'content':menssagem}]
    setMenssagens(newMessages)
    
    try {
      const response = await EnviarMensagem(menssagem, session_id);
      const mensagemIA=response[0]
      setMenssagens([...newMessages, mensagemIA]);


  } catch (error) {
      console.error("Erro ao enviar mensagem: ", error.message);
  }
  setTimeout(scrollBottom, 90);
  }

  async function deletChat(){
    DeletarChat(session_id)
    window.location.href = '/';
  }

  
  return (
    <div className='input_group'>
      <input
        type='text'
        value={value}
        placeholder='Escreva uma menssagem...'
        onChange={(e) => setValue(e.target.value)} 
      />
      <button onClick={handleSendMessage} ><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#006AE2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
      <button onClick={deletChat}><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#FF7D32F4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
    </div>
  )
}

function UserMSG({message}){
  return(
    <span className='user menssagem'>{message}</span>
  )
}

function BotMSG({message}){
  return(
    <span className='ia menssagem'>{message}</span>
  )
}


function Chat({session_id, menssagens, setMenssagens}){


  return(
    <div className='chat_wrapper'>
       {session_id}
      <div className='chat_content'>
        {menssagens.map((menssagem) =>(
          menssagem['type'] === 'human'? <UserMSG message={menssagem['content']} /> : <BotMSG message={menssagem['content']} />
        ))}
        <span className='abraUmChat menssagem'>Comece criando um novo chat!</span>
      </div>
      <InputGroup session_id={session_id} setMenssagens={setMenssagens} mensagens={menssagens} ></InputGroup>
    </div>
  )
}


function scrollBottom(){
  const chatContent = document.querySelector('.chat_content');
  chatContent.scrollTo(0, chatContent.scrollHeight);
}

function setOpacity(){
  var input_group = document.querySelector('.input_group');
  var abraUmChat = document.querySelector('.abraUmChat')
  abraUmChat.style.display = 'none';
  input_group.style.opacity = 1;
}

export default App;
