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



### Lista de bibliotecas de terceiros utilizadas

#### Backend

#### Frontend


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
pelo aluno
- Melhoraria um pouco mais o design da aplicação, explorando mais o Material Design do Google, para que a experiência
de uso e navegação ficassem mais agradáveis.
- Inserção de um arquivo de configuração externo ao código para facilitar a instalação em ambientes de desenvolvimento e
produção sem precisar alterar diretamente no código
- Testes unitários

### Quais requisitos obrigatórios que não foram entregues

Nenhum.

