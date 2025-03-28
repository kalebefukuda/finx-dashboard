# CENTRO UNIVERSITÁRIO CATÓLICA DE SANTA CATARINA  
## ENGENHARIA DE SOFTWARE

<br>

### PLANEJAMENTO E MODELAGEM DE SOFTWARE

**Aluno:** Kalebe Fukuda de Oliveira  
**Matrícula:** 1324841  
**Disciplina:** Qualidade de Software  
**Professor:** Diego Sauter Possamai


<br>

## Planejamento e Modelagem do Sistema FinX  
### *Dashboard Financeiro Pessoal*

**Joinville – SC**  
**Março de 2025**

---

## 1. INTRODUÇÃO

O presente documento tem como objetivo apresentar o planejamento e a modelagem inicial do sistema **FinX**, um dashboard financeiro pessoal que visa oferecer aos usuários uma maneira simples, intuitiva e eficiente de controlar suas finanças.

O **FinX** surge como resposta à crescente demanda por ferramentas digitais acessíveis que ajudem pessoas comuns — mesmo sem conhecimento avançado em finanças — a organizarem seus gastos, visualizarem sua evolução patrimonial e planejarem melhor sua vida financeira. Inspirado em plataformas modernas como o Investidor10, o sistema aposta em uma interface minimalista, com foco na clareza das informações e facilidade de uso.

**Propósito central:** Permitir que o usuário acompanhe de forma clara suas entradas e saídas financeiras, cadastre seus ativos e metas, e visualize relatórios gráficos de sua saúde financeira, facilitando a tomada de decisões cotidianas.

**Público-alvo:** o sistema é voltado para jovens adultos, estudantes e profissionais que desejam controlar suas finanças de forma prática e visual, utilizando uma plataforma responsiva e acessível via web.


## 2. MODELAGEM DO SOFTWARE

### 2.1 Requisitos Funcionais ✅ 

- **RF01:** O sistema deve permitir o cadastro e autenticação de usuários com email e senha.
- **RF02:** O usuário deve poder realizar login com autenticação segura.
- **RF03:** O sistema deve permitir o cadastro de entradas financeiras.
- **RF04:** O sistema deve permitir o cadastro de saídas financeiras.
- **RF05:** O sistema deve permitir a edição e exclusão de entradas e saídas financeiras.
- **RF06:** O sistema deve exibir o saldo total com base nas movimentações cadastradas.
- **RF07:** O sistema deve permitir o cadastro de ativos financeiros.
- **RF08:** O sistema deve salvar automaticamente os dados no banco de dados.
- **RF09:** O sistema deve permitir o logout seguro do usuário.
- **RF10:** O sistema deve permitir o usuário criar categorias pessoas de investimento e renda.

### 2.2 Requisitos Não Funcionais ❓

- **RNF01:** O sistema deve ser desenvolvido com arquitetura monolítica utilizando Next.js.
- **RNF02:** O banco de dados deve ser hospedado no Supabase.
- **RNF03:** O sistema deve implementar autenticação segura com hash de senhas e tokens de sessão.
- **RNF04:** O sistema deve ser responsivo, adaptando-se a diferentes tamanhos de tela.
- **RNF05:** O sistema deve oferecer suporte aos modos claro e escuro, adaptando-se ao sistema operacional do usuário.
- **RNF06:** O tempo de resposta deve ser inferior a 1 segundo nas principais interações.
- **RNF07:** O código deve ser versionado com GitHub, utilizando controle de branches e boas práticas de commits.
- **RNF08:** O sistema deve ser compatível com navegadores modernos (Chrome, Firefox, Safari e Edge).
- **RNF09:** A interface deve ser construída com Tailwind CSS v4, garantindo consistência visual e performance.
- **RNF10:** O sistema deve ser testado com dados fictícios antes da publicação.

---

### 2.3 Diagramas e Estrutura de Dados

> ⚠️ Os diagramas serão adicionados posteriormente como imagens exportadas do Figma, dbdiagram.io ou Lucidchart.

#### • Caso de uso (exemplo):

- `Diagrama de Caso de Uso - FinX.png`

#### • Diagrama de Classes:

- `Diagrama de Classes - FinX.png`

#### • Modelo de Dados (Banco de Dados Relacional):

- `Modelo ER - Supabase.png`

#### • Fluxo de Navegação / Wireframe:

- `Wireframe - Dashboard.png`  
- `Wireframe - Tela de Cadastro.png`  
- `Wireframe - Tela de Ativos.png`

### 2.4 Arquitetura do Sistema

O sistema **FinX** segue uma **arquitetura monolítica**, onde tanto o **front-end** quanto o **back-end** são integrados em uma única aplicação. Isso significa que todas as funcionalidades, desde o gerenciamento das finanças até a autenticação e manipulação dos dados, são realizadas dentro do mesmo sistema, sem a necessidade de separar o front-end e o back-end em serviços distintos.

### Características da Arquitetura Monolítica do FinX:

- **Back-end integrado ao Next.js:** O **Next.js** gerencia tanto as rotas de front-end quanto as rotas de API (através das **API Routes**).
  
(Usando estrutura da documentação do [Next.js](https://nextjs.org))

### 2.5 Planejamento da Infraestrutura
- **Banco de Dados:** **Supabase** (utilizando PostgreSQL como banco de dados relacional).
- **Back-end:** **Next JS** c (utilizando **API Routes** para a implementação de funcionalidades de back-end dentro do próprio Next.js).
- **Front-end:** **React.js** com **Tailwind CSS v4**, garantindo uma interface moderna e responsiva.
- **Autenticação:** **NextAuth** para autenticação segura, com suporte a login via email e senha.
- **Hospedagem:** **Vercel** (para deploy do front-end) e **Supabase** (para o banco de dados).
- **Monitoramento:** a definir
 

## 3. PLANEJAMENTO DA QUALIDADE DO SOFTWARE

Para garantir a qualidade do sistema **FinX** durante todas as etapas do desenvolvimento, serão adotadas normas e práticas sistemáticas de verificação, validação e manutenção do código.

### 3.1 Normas e Padrões Utilizados

- **ISO/IEC 25010:** Utilizada como referência para os atributos de qualidade do software, especialmente usabilidade, desempenho, segurança e manutenibilidade.
- **ISO/IEC 12207:** Adotada como base para o processo de ciclo de vida do software, estruturando as fases de desenvolvimento, testes e manutenção.
- **Conventional Commits:** Padrão de mensagens de commit para facilitar a rastreabilidade de alterações no código.
- **Prettier + ESLint:** Ferramentas que garantem a padronização e legibilidade do código-fonte em tempo real.
- **Tailwind CSS v4:** Framework de estilo utilizado para garantir consistência visual, responsividade e performance.

### 3.2 Estratégias de Garantia de Qualidade

- **Versionamento com Git/GitHub:**
  - Uso de branches por funcionalidade.
  - Pull requests com revisão obrigatória de código.
  - Controle de histórico de alterações.

- **Revisões de Código (Code Review):**
  - Revisões realizadas em cada nova funcionalidade, com foco em legibilidade, segurança e aderência às boas práticas.

- **Testes Automatizados:**
  - Implementação de testes unitários e testes de integração com foco nas regras de negócio e comunicação com o banco de dados **Supabase**.

- **Testes Manuais:**
  - Validação funcional realizada em ambiente de desenvolvimento com dados fictícios, especialmente para as funcionalidades críticas como cadastro de movimentações e exibição de gráficos.

- **Documentação Técnica:**
  - Organização da documentação do sistema diretamente no repositório GitHub, incluindo **README**, instruções de uso, estruturas de banco de dados e APIs.

- **CI/CD (Integração Contínua / Entrega Contínua):**
  - Uso de **GitHub Actions** para automação de builds e deploys, garantindo que a cada push no repositório, o sistema seja automaticamente testado e as alterações sejam integradas de forma contínua.

### 3.3 Planejamento de Testes

O planejamento de testes para o **FinX** será realizado para garantir que todas as funcionalidades do sistema estejam funcionando corretamente e atendam aos padrões de qualidade definidos. Os testes a seguir serão aplicados:

#### 3.3.1 Testes Unitários

- ✅ **Objetivo:** Garantir que as funções e componentes individuais funcionem corretamente.
- ✅ **Como será feito:** Utilizando **Jest** para testar funções no **back-end** (API Routes do Next.js) e no **front-end**.
- ✅ **Medição:** A meta é garantir cobertura de pelo menos **80%** do código.
- ✅ **Validação:** Os resultados dos testes devem atender aos critérios de aceitação definidos para cada funcionalidade.


#### 3.3.2 Testes de Usabilidade

- ✅ **Objetivo:** Avaliar a experiência do usuário e garantir que a navegação seja intuitiva.
- ✅ **Como será feito:** Realização de testes **A/B** com usuários reais, além de usar ferramentas como **Hotjar** para análise de interações.
- ✅ **Medição:** Taxa de sucesso das tarefas executadas pelos usuários.
- ✅ **Validação:** Pelo menos **90%** dos usuários devem conseguir completar tarefas básicas sem dificuldades.

#### 3.3.3 Testes de Segurança

- ✅ **Objetivo:** Garantir que o sistema esteja protegido contra falhas de segurança.
- ✅ **Como será feito:** Utilizando ferramentas como **OWASP ZAP** (exemplo) para identificar vulnerabilidades e realizar testes de **injeção SQL** e **XSS**.
- ✅ **Medição:** O número de vulnerabilidades críticas deve ser a mínima possível antes do lançamento.
- ✅ **Validação:** As vulnerabilidades encontradas serão corrigidas antes da liberação para produção.

#### 3.3.4 Testes de Performance

- ✅ **Objetivo:** Avaliar o desempenho e a escalabilidade do sistema.
- ✅ **Como será feito:** Usando ferramentas como **JMeter** (exemplo) para realizar testes de carga e simular acessos simultâneos ao sistema.
- ✅ **Medição:** O tempo de resposta deve ser inferior a **2 segundos** mesmo com **1000 usuários simultâneos**.
- ✅ **Validação:** O desempenho será monitorado e otimizado, se necessário, para garantir que a experiência do usuário não seja prejudicada.



## 4. MÉTRICAS DE QUALIDADE

Para garantir que o sistema FinX atenda aos padrões de qualidade definidos, serão monitoradas as seguintes métricas:

### 4.1 Métricas de Código

- **Complexidade Ciclomática:** 
  - Medida que avalia a complexidade do código e prevê as dificuldades de manutenção. Será monitorada por ferramentas de análise estática de código.
  
- **Cobertura de Código:** 
  - Percentual do código que é testado por testes automatizados. A meta será garantir que mais de 80% do código seja coberto por testes.
  
- **Linhas de Código por Método:** 
  - Mede o tamanho e a complexidade dos métodos. Métodos com muitas linhas de código serão refatorados para garantir maior clareza e manutenção.

### 4.2 Métricas de Desempenho

- **Tempo de Resposta:** 
  - O tempo médio que o sistema leva para responder às requisições. O objetivo é garantir que o tempo de resposta nas funcionalidades principais não ultrapasse 1 segundo.
  
- **Uso de Memória:** 
  - A quantidade de memória consumida pelo sistema sob carga. Será monitorado para evitar picos de uso excessivo.
  
- **Número de Requisições por Segundo:** 
  - Mede a capacidade do sistema de lidar com múltiplos usuários simultaneamente. A meta é garantir que o sistema consiga suportar pelo menos 100 requisições por segundo sem degradação de performance.

### 4.3 Métricas de Usabilidade

- **Taxa de Sucesso nas Tarefas:** 
  - Percentual de usuários que conseguem completar tarefas sem dificuldades. Será monitorado através de testes de usabilidade com usuários reais.
  
- **Tempo Médio para Completar uma Tarefa:** 
  - Mede o tempo necessário para realizar ações principais na aplicação, como cadastrar uma entrada financeira. O objetivo é garantir que os usuários completem essas tarefas de forma eficiente.

- **Número de Erros de Usuário:** 
  - Quantidade de erros cometidos durante o uso do sistema. Serão realizados testes de usabilidade para monitorar e reduzir a quantidade de erros.

### 4.4 Métricas de Segurança

- **Número de Vulnerabilidades Encontradas:** 
  - Número de falhas de segurança detectadas em auditorias. O objetivo é minimizar vulnerabilidades críticas.

- **Tempo Médio para Correção de Falhas:** 
  - Mede o tempo necessário para corrigir falhas de segurança ou bugs críticos. O objetivo é garantir que falhas de segurança sejam corrigidas dentro de 24 horas.

---

## 5. CONCLUSÃO

O planejamento e a modelagem do sistema **FinX** foram  elaborados para garantir a entrega de um software de qualidade. O sistema será desenvolvido com foco na experiência do usuário, oferecendo uma interface clara e simples para o gerenciamento financeiro. Além disso, a implementação de práticas de **qualidade de software**, como **CI/CD**, **testes automatizados** e **revisões de código**, garantirá que o sistema seja robusto, seguro e escalável.

Os próximos passos do projeto incluem a finalização da modelagem de dados, implementação das funcionalidades principais, e o início dos testes automatizados. O sistema será constantemente monitorado quanto à performance, usabilidade e segurança, e ajustado conforme necessário para atender aos requisitos definidos.

O objetivo é entregar uma solução funcional, segura e de fácil uso que auxilie o público-alvo a melhorar a gestão de suas finanças pessoais de maneira simples e eficiente.

