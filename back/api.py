from fastapi import FastAPI, HTTPException, Body
from uuid import UUID, uuid4
from chat import enviar_menssagem, get_all_messages, get_type_content_session_id, delete_messages
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir o frontend React
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

@app.post("/chat/")
def new_chat():
    session_id = str(uuid4())
    enviar_menssagem(session_id, "Olá!")
    return get_type_content_session_id(session_id)


@app.post("/chat/{session_id}")
def send_message(session_id: str, message: dict):

    return enviar_menssagem(session_id, message['message'])



@app.get("/chat/")
def chats():
    chats = []
    for i in get_all_messages():
        if {'chat':i.session_id} not in chats:
            chats.append({'chat':i.session_id})
    return chats

@app.get("/chat/{session_id}")
def chat_history(session_id: str):
    return get_type_content_session_id(session_id)



@app.delete("/chat/{session_id}")
def delete_chat(session_id: str):
    delete_messages(session_id)
    return RedirectResponse(url="http://localhost:3000/")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)