# Simulador de Trajetória de Projétil

## Descrição

O **Simulador de Trajetória de Projétil** permite que os usuários visualizem a trajetória de um projétil com base em parâmetros como velocidade inicial e ângulo de lançamento. O simulador utiliza fórmulas da física clássica para calcular a trajetória, permitindo que os usuários experimentem com diferentes condições de lançamento e comparem as trajetórias resultantes.

## Funcionalidades

- Cálculo automático da trajetória de um projétil.
- Ajuste de velocidade inicial (em metros por segundo) e ângulo de lançamento (de 0° a 90°).
- Visualização da trajetória em um gráfico interativo.
- Comparação de múltiplas trajetórias através de checkboxes que permitem habilitar ou desabilitar a visualização de cada trajetória no gráfico.

## Como Usar

1. **Ajustar Parâmetros:**

   - Insira a **velocidade inicial** (v₀) no campo de entrada.
   - Use o controle deslizante para ajustar o **ângulo de lançamento** (θ) entre 0° e 90°.

2. **Visualizar Trajetória:**

   - Clique no botão **"Atualizar Trajetória"** para calcular e plotar a trajetória do projétil com os parâmetros selecionados.

3. **Comparar Trajetórias:**
   - Após cada clique no botão, uma nova trajetória será adicionada ao gráfico.
   - Os checkboxes abaixo do gráfico permitem habilitar ou desabilitar a visualização das trajetórias plotadas. O texto de cada checkbox exibe o ângulo e a velocidade inicial usados para gerar a trajetória.

## Implementação

O simulador é construído utilizando as seguintes tecnologias:

- **HTML/CSS**: Estrutura e estilo da página.
- **JavaScript**: Lógica do simulador e manipulação do gráfico.
- **Chart.js**: Biblioteca para a criação de gráficos interativos.

### Fórmulas Utilizadas

O simulador calcula a trajetória do projétil com base nas seguintes equações:

- **Tempo total de voo**:
  \[
  t\_{vo} = \frac{2 \cdot v_0 \cdot \sin(\theta)}{g}
  \]

- **Posição horizontal**:
  \[
  x = v_0 \cdot \cos(\theta) \cdot t
  \]

- **Posição vertical**:
  \[
  y = v_0 \cdot \sin(\theta) \cdot t - 0.5 \cdot g \cdot t^2
  \]

  Onde:

  - \( v_0 \): Velocidade inicial (m/s)
  - \( \theta \): Ângulo de lançamento (radianos)
  - \( g \): Aceleração da gravidade (aproximadamente 9.81 m/s²)

## Requisitos

- Um navegador da web moderno (Chrome, Firefox, Safari, etc.).
- Conexão à internet para carregar bibliotecas externas, como Bootstrap e Chart.js.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, relatórios de bugs ou sugestões. Para isso, crie um fork deste repositório e envie suas alterações através de um pull request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
