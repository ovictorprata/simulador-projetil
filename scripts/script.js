let trajetoriaChart; // Variável global para o gráfico
let clickCount = 0; // Contador de cliques

function calcularTrajetoria(v0, angulo) {
  const g = 9.81; // Aceleração devido à gravidade (m/s²)
  const anguloRad = angulo * (Math.PI / 180); // Converter ângulo de graus para radianos

  const tVo = (2 * v0 * Math.sin(anguloRad)) / g; // Tempo total de voo
  const numPontos = 100; // Número de pontos a serem calculados
  const x = [];
  const y = [];

  for (let i = 0; i <= numPontos; i++) {
    const t = (i / numPontos) * tVo; // Tempo atual
    // Cálculo das coordenadas x e y
    x.push((v0 * Math.cos(anguloRad) * t).toFixed(2)); // Cálculo da coordenada x arredondado
    y.push((v0 * Math.sin(anguloRad) * t - 0.5 * g * t * t).toFixed(2)); // Cálculo da coordenada y arredondado
  }

  return { x, y };
}

function plotarTrajetoria() {
  const v0 = parseFloat(document.getElementById("v0").value); // Velocidade inicial
  const angulo = parseFloat(document.getElementById("angulo").value); // Ângulo de lançamento
  const { x, y } = calcularTrajetoria(v0, angulo);

  const ctx = document.getElementById("trajetoriaChart").getContext("2d");

  // Se o gráfico não existir, crie um novo
  if (!trajetoriaChart) {
    trajetoriaChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: x,
        datasets: [],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Distância (m)",
            },
            type: "linear", // Define o tipo de escala do eixo X
            position: "bottom",
          },
          y: {
            title: {
              display: true,
              text: "Altura (m)",
            },
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Adiciona um novo conjunto de dados ao gráfico
  const datasetIndex = trajetoriaChart.data.datasets.length; // Índice do novo conjunto de dados
  trajetoriaChart.data.datasets.push({
    label: `Trajetória do Projétil ${
      datasetIndex + 1
    } (ângulo: ${angulo}° e v0: ${v0} m/s)`,
    data: y.map((val, index) => ({ x: x[index], y: val })), // Converte os dados para o formato correto
    borderColor: getRandomColor(), // Gera uma cor aleatória para cada gráfico
    backgroundColor: "rgba(40, 167, 69, 0.1)",
    fill: false, // Define fill como false para não preencher a área abaixo da curva
  });

  // Adiciona o checkbox para controlar a visibilidade do gráfico
  addCheckbox(
    `Trajetória do Projétil ${
      datasetIndex + 1
    } (ângulo: ${angulo}° e v0: ${v0} m/s)`,
    datasetIndex
  );

  trajetoriaChart.update(); // Atualiza o gráfico

  clickCount++; // Incrementa o contador de cliques
}

// Função para gerar cores aleatórias para os gráficos
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Função para adicionar checkbox ao gráfico
function addCheckbox(label, index) {
  const checkboxContainer = document.getElementById("checkboxes");
  const checkboxId = `checkbox-${index}`;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxId;
  checkbox.checked = true; // Checkbox habilitado por padrão
  checkbox.addEventListener("change", function () {
    trajetoriaChart.data.datasets[index].hidden = !this.checked; // Atualiza a visibilidade do gráfico
    trajetoriaChart.update(); // Atualiza o gráfico
  });

  const labelElement = document.createElement("label");
  labelElement.htmlFor = checkboxId;
  labelElement.textContent = label;

  const div = document.createElement("div");
  div.appendChild(checkbox);
  div.appendChild(labelElement);
  checkboxContainer.appendChild(div);
}

// Função para limpar o gráfico e os checkboxes
function limparGrafico() {
  trajetoriaChart.data.datasets = []; // Limpa os dados do gráfico
  trajetoriaChart.update(); // Atualiza o gráfico
  document.getElementById("checkboxes").innerHTML = ""; // Limpa os checkboxes
}

// Atualiza o valor do ângulo mostrado ao lado do slider
document.getElementById("angulo").addEventListener("input", function () {
  document.getElementById("anguloValue").textContent = this.value;
});

// Exemplo de uso inicial
plotarTrajetoria();
