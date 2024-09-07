# Minesweeper 🎮

Bem-vindo ao repositório do **Minesweeper**! Este é o clássico jogo de campo minado, agora disponível na web com uma interface moderna e responsiva. Jogue, descubra e evite as bombas para conquistar a vitória! 🏆

## 📚 Tabela de Conteúdos

- [🌟 Visão Geral](#-visão-geral)
- [📦 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚙️ Funcionalidades](#-funcionalidades)
- [🚀 Instalação e Execução](#-instalação-e-execução)
- [🎨 Estilo e Temas](#-estilo-e-temas)
- [🛠️ Estrutura do Código](#-estrutura-do-código)

## 🌟 Visão Geral

O **Minesweeper** é um jogo de estratégia onde o objetivo é revelar todas as células do campo sem ativar as bombas. O jogo é composto por uma grade de células, algumas contendo bombas e outras com números que indicam o número de bombas adjacentes.

## 📦 Estrutura do Projeto

```
/js-minesweeper
├── index.html             # Estrutura HTML do jogo
├── styles.css             # Estilos e temas
├── /js
│   ├── app.js             # Lógica principal do jogo
│   ├── matrix.js          # Manipulação da matriz do jogo
│   ├── revealCells.js     # Revelação de células e eventos
│   ├── render.js          # Renderização do tabuleiro
│   └── utils.js           # Funções auxiliares
└── /assets
    ├── favicon.png        # Ícone do navegador
```

## ⚙️ Funcionalidades

- **🧩 Matriz Dinâmica**: Criação e gerenciamento de uma matriz de células com bombas.
- **💣 Revelação de Células**: Clique para revelar células e ver o número de bombas adjacentes.
- **🚩 Colocação de Bandeiras**: Marque células suspeitas com bandeiras para indicar possíveis bombas.
- **🌗 Alternância de Tema**: Troque entre modos claro e escuro para personalizar a sua experiência de jogo.

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

### `app.js`

- **`handleClick(event, matrix, row, col, bombQuantity)`**: Gerencia a lógica de clique nas células, revelando o conteúdo das células ou colocando bandeiras. Verifica o estado do jogo e chama as funções apropriadas para revelar células ou lidar com bandeiras.
- **`checkEndGame(cell, cellValue, revealedCells, matrix, bombQuantity)`**: Verifica as condições de término do jogo, revelando bombas e mostrando a mensagem de vitória ou derrota.
- **`placeFlag(event)`**: Alterna o modo de colocar bandeiras nas células. Marca ou desmarca uma célula como uma possível bomba.
- **`main()`**: Inicializa o jogo, configurando a alternância de temas, criando a matriz do jogo e configurando os eventos de clique e contexto para manipular as células.

### `matrix.js`

- **`createMatrix(rows, cols, bombs)`**: Cria a matriz do jogo com células vazias e bombas.
- **`createEmptyMatrix(rows, cols)`**: Gera uma matriz inicial vazia.
- **`addBombs(matrix, bombs)`**: Adiciona bombas aleatoriamente e atualiza as células adjacentes.
- **`updateAdjacentCells(matrix, row, col)`**: Atualiza as contagens de bombas nas células ao redor.

### `revealCells.js`

- **`revealNextCells(matrix, row, col, handleClick, bombQuantity)`**: Revela células adjacentes quando uma célula vazia é clicada.
- **`revealBombs(win)`**: Exibe as bombas no final do jogo, dependendo se o jogador venceu ou perdeu.

### `render.js`

- **`renderGame(matrix, renderSpace, handleClick, placeFlag, bombQuantity)`**: Renderiza o tabuleiro e configura os eventos de clique.

### `utils.js`

- **`ableToggleTheme(toggleButton)`**: Gerencia a alternância entre temas e armazena a preferência no `localStorage`.
- **`createCell(tag, className, rowIndex, colIndex)`**: Cria e retorna elementos de célula com atributos e classes apropriadas.

---

Cuidado com as bombas e divirta-se! 💣🚩🧩
