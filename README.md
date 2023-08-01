# Projeto de Extração de Dados de Faturas de Energia Elétrica - Frontend

Este projeto foi desenvolvido como parte do teste de conhecimento para a vaga de Desenvolvedor Full Stack Pleno na empresa Lumi. O objetivo do projeto é extrair os dados relevantes de faturas de energia elétrica, organizar esses dados em um banco de dados PostgreSQL e apresentá-los em uma aplicação web usando React como frontend e Node.js como backend.

## Versões dos Softwares Utilizados
  - Node.js: v18.17.0
  - Yarn: 1.22.19
  - npm: v9.8.1

## Como Utilizar o Projeto
Siga os passos abaixo para utilizar o projeto:

1. Rode o seguinte comando na pasta raiz do projeto para baixar as dependências das bibliotecas (node_modules):
   - ```yarn```

2. Altere o nome do arquivo `.env.example` para `.env` e coloque o seguinte dado:
   - `NEXT_PUBLIC_API_URL`: URL em que está rodando a [API](https://github.com/helder9991/Boltz-Sistemas-Backend-NodeJS/tree/master).
  

2. Rode o seguinte comando na pasta raiz do projeto para iniciar o frontend:
   - ```yarn dev```
  
## Telas da Aplicação
As telas da aplicação foram elaboradas no Figma e podem ser visualizadas nos seguintes links:
- [Dashboard](https://www.figma.com/proto/likZ1nDep21Bes7UDiCKvK/Untitled?type=design&node-id=50-921&t=GQ1TdwxyusHyzuWG-1&scaling=contain&page-id=0%3A1&starting-point-node-id=50%3A921&mode=design)
- [Histórico de Faturas](https://www.figma.com/proto/likZ1nDep21Bes7UDiCKvK/Untitled?type=design&node-id=3-13&t=JsO7cXfvEgh2JEzz-1&scaling=contain&page-id=0%3A1&starting-point-node-id=50%3A921&mode=design)


# Estrutura do Projeto Frontend Next.js:
O projeto frontend do Next.js está organizado seguindo uma estrutura bem definida para facilitar o desenvolvimento e a manutenção. A estrutura do projeto é explicada abaixo:

## src: Página Raiz do Projeto

Dentro da pasta "src", temos os seguintes diretórios:

### components:  
A pasta components é usada para separar componentes que serão utilizados somente nesta página. Esses componentes são específicos e relevantes apenas para a funcionalidade da página, ajudando a manter o código da página menos verboso e mais organizado.

### utils:  
A pasta utils é usada para armazenar funções auxiliares que podem ser utilizadas em várias partes da aplicação. Essas funções fornecem utilidades que podem ser reutilizadas em diferentes partes do projeto.

### app:
O diretório app é onde fica a parte principal da aplicação. Ele contém os arquivos e pastas relacionados às páginas, roteamento, gerenciamento de estado global e outros recursos específicos do aplicativo.

Dentro do diretório app, cada página possui sua própria pasta com a seguinte estrutura:

  - [pasta da página]:
Dentro da pasta [pasta da página], temos os arquivos relacionados à página específica:

  - [pasta da página]/components/: A pasta components é usada para quebrar a página em pequenos componentes que são específicos e relevantes apenas para a funcionalidade da página em questão. Esses componentes não são reutilizáveis em outras partes do projeto, diferentemente dos componentes presentes na pasta components na raiz do projeto, que são genéricos e reutilizáveis em várias partes da aplicação. Essa abordagem de separar os componentes da página em sua própria pasta torna o código mais organizado e facilita a manutenção da página.

  - [pasta da página]/page.tsx: O arquivo page.tsx representa a página específica e é responsável por exibir o conteúdo na interface do usuário. Ele pode conter a lógica necessária para buscar dados, gerenciar formulários e outras funcionalidades da página.

  - [pasta da página]/styles.module.css: O arquivo styles.module.css é usado para estilizar a página específica. Ele contém os estilos CSS específicos dessa página, garantindo que eles não interfiram com outros estilos do aplicativo.

Além disso, foi utilizado o Tailwind CSS, uma biblioteca de utilitários CSS, para facilitar a estilização e criação de interfaces de forma mais rápida e consistente. O Tailwind CSS oferece uma abordagem "utility-first", onde classes CSS predefinidas são combinadas para estilizar os elementos da página, tornando o processo de desenvolvimento mais ágil e eficiente.

Essa estrutura visa criar um código mais organizado, modular e reutilizável, seguindo as boas práticas do Next.js e facilitando o desenvolvimento e a manutenção do projeto frontend.


