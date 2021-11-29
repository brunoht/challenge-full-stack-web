Comments
===================

## Detalhes do projeto

### Decisão da arquitetura utilizada 
  
A aplicação foi separada em duas camadas:
    
- app: frontend da aplicação
- ws: backend da aplicação

Esta arquitetura foi escolhida por ser uma boa prática separar as camadas da aplicação. Isso a torna escalável e 
as responsabilidades de cada camada ficam mais organizadas. Além disso, caso fossem escolhidas duas linguagens ou 
tecnologias distintas (PHP no backend e JS no frontend, por exemplo), ficaria mais simples para prganizar equipes
com experiência em cada uma das tecnologias sem que precisassem aprender ou lidar com código que não são familiarizados.
  
Também pensando em infraestrutura, separando as camadas, é possível escalar a infraestrutura apenas da aplicação que
precise de mais recurso. 
  
Além disso, separando as camadas, realizar manutenções no código, em caso de alguma falha, não faz com que toda a
aplicação pare de funcionar, apenas a camada que apresenta problema e, considerando que foi utilizado NodeJs, atualmente
os próprios servidores já possuem controle eficiente e rollback automáticos em caso de uma falha após determinada
alteração no código. Como as camadas separadas são bem mais leves do que uma aplicação monolítica, em casos de 
recuperação, o rollback é muito mais rápida de ser executada.
  
Caso haja a necessidade de mudar a tecnologia no futuro, migrando do Node para qualquer outra linguagem, o processo
de refatoração poderá ser feito em etapas, não comprometendo toda a aplicação de uma única vez. Isso reduz o tempo de
refatoração e, consequentemente, custos financeiros do projeto.

Para o banco de dados foi escolhido o Postgres, mas a escolha aqui foi puramente pelo desafio. Eu ainda não tinha
trabalhado com o Postgres integrado ao Node, apenas ao PHP, portanto preferi utilizar aqui como didática. Normalmente,
para um projeto Node eu preferiria o MongoDB (inclusive foi a primeira etapa da implementação).

Ainda sobre o banco de dados, foi criada a pasta migrations que armazena um "histórico" das etapas de manipulação do
banco e dados, fazendo com que se crie uma espécie de versinamento da estrutura do banco de dados. Essa abordagem é
importante para o controle de futuras atualizações da aplicação na qual haja a necessidade de alteração do banco de dados.

O código foi construído em duas etapas, onde a primeira consistia em apenas montar o projeto como um todo e garantir que
ele funcionasse de uma maneira mais simples, mas que me permitisse ver a aplicação como um todo montada. Praticamente
todo o código foi montado num único arquivo, mas isso me ajuda a fazer as coisas mais rapidamente, testar as possíveis
tecnologias que serão utilizadas no projeto, sem ficar me preocupando muito com a estrutura de pastas, passagem
de dados, importação e uso de arquivos externos.

Já na segunda etapa, o código já estava todo preparado e funcionando, foi quando realizei o refatoramento do código,
aplicando melhores práticas de separação das responsabilidades e criando uma hierarquia de diretórios que me permita
manter e escalar o projeto para as próximas atualizações. Como é um projeto didático apenas, claro que não forcei demais
uma estruturação completa nem muito complexa. Eu ainda faria um pouco diferente se fosse um projeto real, mas
considerando que ele precisa ser funcional (seja na sua execução como na leitura do código) eu preferi manter algo que
fosse adequado ao tamanho do sistema, sem exagerar demais na separação. De qualquer forma, o projeto está com uma
estrutura inicial eficiente para a sua finalidade e, caso ele realmente cresça, será fácil realizar uma nova
fatoração e redistribuição do código para comportar uma realidade mais complexa.

Nas rotas da aplicação, por ser uma API, é uma boa prática trabalhar com o versionamento dela. Por isso, as rotas que
manipulam uma Entidade da aplicação, começa com /api/v1. Claro que a estrutura da pasta e os arquivos não foram
segmentados aqui neste projeto, onde preferi concentrar todas as rotas no arquivo routes/index.js. Mas em um projeto
maior, seria mais interessante que cada entidade tivesse seu próprio arquivo para facilitar a manutenção. Fica de
sugestão para futura melhoria também.

### Lista de bibliotecas de terceiros utilizadas

nodemon: utilizado para melhorar a produtividade, pois realiza hot reload automático sempre que há alguma alteração no
código, sem que eu precise parar e reiniciar a aplicação.

body-parser: é um middleware, ou seja, uma camada que além de simplificar a manipulação das requisições que entram na API, ele garante uma camada
extra de segurança e tratamento e erros.

cors: middleware para tratamento e requisições de origens externas.

dotenv: armazena variáveis de ambiente permitindo que informações sensíveis ou variáveis que se aplicam apenas ao
local onde a aplicação está instalada evitando que haja qualquer alteração no código fonte da aplicação.

jest: ferramenta para executar testes.

axios: utilizado em conjunto do jest para realizar alguns testes na API.

### O que você melhoraria se tivesse mais tempo

- Adicionaria mais camadas de segurança e token de autenticação dos endpoints da API, possivelmente JWT ou OAuth2
- Prepararia mais componentes de formulário e tabela para serem utilizados dentro de um padrão em toda a aplicação e
  para facilitar a implementação e manutenção do código e consistência visual
- Usuários e perfis de usuários, com níveis de permissão, além de permissões editáveis de forma dinâmica (onde os
  administradores criariam seus próprios nives de acesso e definem as telas e funções permitidas para o usuário ou
  para o grupo ao qual o usuário pertence)
- Formulário de login e registro de usuário
- Perfis de acesso (no mínimo: Administrador, Professor e Aluno) onde cada um teria seus recursos específicos para seu 
  nível de acesso
- Considerando que o sistema é uma ambiente de cadastro de alunos (matrícula), seria muito importante inserir documentos
digitalizados como RG, CNH e o histórico escolar para deixar anexado a matrícula do aluno. O aluno teria a possibilidade
de enviar os documentos e os administradores seriam notificados para analisar aprovar/reprovar os documentos enviados 
pelo aluno.
- Melhoraria um pouco mais o design da aplicação, explorando mais o Material Design do Google, para que a experiência
de uso e navegação ficassem mais agradáveis.
- Criar uma camada de ORM que permita a seleção do banco de dados sem alteração no código da aplicação.

### Quais requisitos obrigatórios que não foram entregues

Nenhum. Todos os requisitos obrigatórios foram entregues.

