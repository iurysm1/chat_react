# Chat Bot com OpenAI e LangChain

Fiz um chatbot (semelhante ao ChatGPT) usando a API da OpenAI. Ele funciona igual ao ChatGPT.
Usei o framework **LangChain**.
Esse framework é voltado a LLM's e nos ajuda a produzir softwares com IA's.

Como uso muitas ferramentas diferentes, e todas precisam de chaves de acesso, pode acabar dando algum problema. 
Por mais que eu tenha testado em 2 computadores diferentes, para prevenir, deixei um vídeo meu usando a aplicação para mostrar para o professor.

---

## REQUISITOS:
- Possuir o Python instalado.
- Possuir o Node.js.
- Ter uma API_KEY da OpenAI, ou alguma outra LLM (se for outra LLM, vai ter que mexer um pouco no código).
- Ter uma API_KEY do LangChain.

---

## INSTRUÇÕES BACK-END:

1. Vá para a pasta `back-end`.
2. Crie um ambiente virtual e entre nele.
3. Crie um arquivo chamado `.env` e coloque suas API_KEYS nele.
4. Execute o comando: `pip install -r requirements.txt`.

   Se der algum problema na execução do `pip install`:
   - Baixe o [Visual Studio Build Tools](https://visualstudio.microsoft.com/pt-br/visual-cpp-build-tools/).
   - Clique no executável e procure "Desenvolvimento para desktop com C++".
   - Tente executar o comando `pip install` novamente.

5. Com tudo feito, ligue a API com o comando `py api.py`.

---

## INSTRUÇÕES FRONT-END:

1. Vá para a pasta `front-end`.
2. Execute `npx create-react-app "nome_do_app"`.
3. Jogue a pasta `src` dentro do app React criado.
4. Vá para a pasta do app React criado.
5. Instale o axios com: `npm i axios`.
6. Rode o código com `npm start`.
