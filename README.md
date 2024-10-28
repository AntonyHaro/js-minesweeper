# Minesweeper 🎮

Bem-vindo ao repositório do **Minesweeper**! Este é o clássico jogo de campo minado, agora disponível na web com uma interface moderna e responsiva. Jogue, descubra e evite as bombas para conquistar a vitória! 🏆

## 📚 Tabela de Conteúdos

- [🌟 Visão Geral](#-visão-geral)
- [⚙️ Funcionalidades](#-funcionalidades)
- [🚀 Instalação e Execução](#-instalação-e-execução)
- [🎨 Estilo e Temas](#-estilo-e-temas)
- [🛠️ Estrutura do Código](#-estrutura-do-código)

## 🌟 Visão Geral

O **Minesweeper** é um jogo de estratégia onde o objetivo é revelar todas as células do campo sem ativar as bombas. O jogo é composto por uma grade de células, algumas contendo bombas e outras com números que indicam o número de bombas adjacentes.

## ⚙️ Funcionalidades

- **🧩 Matriz Dinâmica**: Criação e gerenciamento de uma matriz de células com bombas.
- **💣 Revelação de Células**: Clique para revelar células e ver o número de bombas adjacentes.
- **🚩 Colocação de Bandeiras**: Marque células suspeitas com bandeiras para indicar possíveis bombas.
- **🌗 Alternância de Tema**: Troque entre modos claro e escuro para personalizar a sua experiência de jogo.
- **📥 Histórico de Jogos**: Histórico local para as partidas em que venceu/perdeu com informações e estatísticas.
- **📲 Responsividade**: A aplicação está responsiva e pronta para ser executada em diversos dispositivos.

## 🚀 Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/minesweeper-game.git
   ```

2. **Navegue até o diretório do projeto:**

   ```bash
   cd minesweeper-game
   ```

3. **Abra o `index.html` em seu navegador** para iniciar o jogo e divirta-se!

4. **Ou simplesmente acesse: https://antonyharo.github.io/js-minesweeper/**

## 🎨 Estilo e Temas

O projeto suporta dois temas: claro e escuro. 🌞🌜 A alternância de tema é feita com um simples botão na interface do jogo, e a preferência é salva no `localStorage` para que sua escolha seja preservada entre sessões.

## 🛠️ Estrutura do Código

O código do **Minesweeper** foi projetado com uma estrutura modular que promove clareza e flexibilidade. Essa abordagem facilita a manutenção e a expansão das funcionalidades ao longo do tempo. Cada módulo possui uma responsabilidade bem definida, permitindo que diferentes partes do jogo sejam desenvolvidas e testadas de forma independente.

### Estrutura Modular

- **Divisão de Responsabilidades**: O código é dividido em módulos que tratam de aspectos específicos do jogo, como a lógica de interação do usuário, a manipulação da matriz de células, o salvamento de partidas no localStorage e a renderização do tabuleiro. Isso resulta em um fluxo de trabalho mais organizado e facilita a identificação de problemas.

- **Reutilização de Código**: As funcionalidades são organizadas de forma a permitir a reutilização de componentes em diferentes partes do jogo. Isso reduz a duplicação de código e melhora a legibilidade.

### Conceitos Aplicados:

- **Interatividade**: O jogo permite que os usuários interajam com a interface, clicando nas células para revelá-las e colocando bandeiras em células suspeitas. A resposta do jogo a essas interações é gerida de forma eficiente, proporcionando uma experiência fluida.

- **Feedback Visual**: O sistema de revelação de células e a exibição de bombas no final do jogo oferecem um feedback visual claro, ajudando os jogadores a entenderem o estado atual do jogo.

- **Persistência de Dados**: A implementação de armazenamento local permite que as preferências dos jogadores, como o tema escolhido, sejam salvas entre as sessões, melhorando a experiência geral.

- **Experiência Personalizada**: A alternância entre modos claro e escuro permite que os jogadores personalizem a aparência do jogo, tornando-o mais acessível e agradável.

- **Escolha da Dificuldade:** Os jogadores podem selecionar diferentes níveis de dificuldade, que influenciam a quantidade de bombas e o tamanho do tabuleiro. Isso proporciona uma experiência adaptada ao nível de habilidade de cada jogador, aumentando a rejogabilidade e o desafio do jogo.

---

Cuidado com as bombas e divirta-se! 💣🚩🧩
