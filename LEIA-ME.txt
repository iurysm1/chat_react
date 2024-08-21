Fiz um chat bot (igual o chatGPT) usando a API da OpenAI, ele funciona igual o chatGPT.
Usei o framework "LangChain".
Esse framwork é voltado a LLM's, nós ajuda a produzir softwares com IA's.

Como uso muitas ferramentas diferentes, e todas precisam de chaves de acesso etc, pode acabar dando algum problema. 
Por mais que eu tenha testado em 2 computadores diferentes, para prevenir, deixei um vídeo meu usando a aplicação para mostrar para o professor.

---------------------------------------------------------------------------------------------------

REQUISITOS:
-Possuir o python instalado;
-Possuir o node.js;
-Ter uma API_KEY da openai, ou alguma outra llm (se for outra llm vai ter que mexer um pouco no código);
-Ter uma API_KEY do langchain
---------------------------------------------------------------------------------------------------

INSTRUÇÕES BACK-END:

-Vá para a pasta "back-end";
-Crie um ambiente virtual e entre nele;
-Crie um arquivo chamado ".env", e coloque suas API_KEYS nele;
-Execute o comando: "pip install -r requirements.txt";

-----------------------------------------------
Se der algum problema na execução do pip install:
-Baixe o visual studio build tools: https://visualstudio.microsoft.com/pt-br/visual-cpp-build-tools/;
-Clique no executável e procure "Desenvolvimento para desktop com C++";
-Tente executar o comando pip install novamente.
---------------------------------------------------

-Com tudo feito, ligue a API com o comando "py api.py".

---------------------------------------------------------------------------------------------------

INSTRUÇÕES FRONT-END:

-Vá para a pasta front-end;

-Execute npx create-react-app "nome_do_app";
-Jogue a pasta "src" dentro do app react criado;
-Vá para a pasta do app react criado;
-Instale o axios com: "npm i axios"
-Rode o código com "npm start".

