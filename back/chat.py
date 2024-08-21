from langchain_openai import ChatOpenAI
from langchain_community.chat_message_histories import SQLChatMessageHistory
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables.history import RunnableWithMessageHistory

from dotenv import load_dotenv, find_dotenv

from sqlalchemy import create_engine, Column, Integer, String, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

import json

_ = load_dotenv(find_dotenv())


from langchain_core.messages import HumanMessage

Base = declarative_base()

class MessageStore(Base):
    __tablename__ = 'message_store'
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String)
    message = Column(String)


model = ChatOpenAI(model="gpt-3.5-turbo")
DATABASE_URL = "sqlite:///memory.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_all_messages():
    session = SessionLocal()
    
    try:
        result = session.query(MessageStore).all()
        return result
    finally:
        session.close()

def get_messages_by_session_id(session_id):
    session = SessionLocal()
    
    try:
        result = session.query(MessageStore).filter(MessageStore.session_id == session_id).all()
        return result
    finally:
        session.close()

def delete_messages(session_id):
    session = SessionLocal()
    
    try:
        msgs=session.query(MessageStore).filter(MessageStore.session_id == session_id).all()
        for msg in msgs:
            session.delete(msg)
        session.commit()
    finally:
        session.close()
    pass


def get_session_history(session_id):
    return SQLChatMessageHistory(session_id, DATABASE_URL)

def get_type_content_session_id(session_id):
    type_content_sessionid =[]
    session_hst=get_messages_by_session_id(session_id)
    for i in session_hst:
        message_json=json.loads(i.message)
        dict = {'type':message_json['type'], 'content':message_json['data']['content']}
        type_content_sessionid.append(dict)
    return [{'session_id':session_id,'message':type_content_sessionid}]



prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You're an assistant who speaks in Portuguese Brazil",
        ),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{input}"),
    ]
)

runnable = prompt | model

runnable_with_history = RunnableWithMessageHistory(
    runnable,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)


def enviar_menssagem(session_id, message):
    menssagem = runnable_with_history.invoke(
    {"input": message},
    config={"configurable": {"session_id": session_id}},
)
    return [{'type': 'ia', 'content':menssagem.content}]



#        dict = {'type':message_json['type'], 'content':message_json['data']['content']}