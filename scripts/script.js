let trajetoriaChart;
let clickCount = 0;

function calcularTrajetoria(v0, angulo) {
  const g = 9.81;
  const anguloRad = angulo * (Math.PI / 180);

  const tVo = (2 * v0 * Math.sin(anguloRad)) / g;
  const numPontos = 100;
  const x = [];
  const y = [];

  for (let i = 0; i <= numPontos; i++) {
    const t = (i / numPontos) * tVo;

    x.push((v0 * Math.cos(anguloRad) * t).toFixed(2));
    y.push((v0 * Math.sin(anguloRad) * t - 0.5 * g * t * t).toFixed(2));
  }

  return { x, y };
}

function plotarTrajetoria() {
  const v0 = parseFloat(document.getElementById("v0").value);
  const angulo = parseFloat(document.getElementById("angulo").value);
  const { x, y } = calcularTrajetoria(v0, angulo);

  const ctx = document.getElementById("trajetoriaChart").getContext("2d");

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
            type: "linear",
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

  const datasetIndex = trajetoriaChart.data.datasets.length;
  trajetoriaChart.data.datasets.push({
    label: `Trajetória do Projétil ${
      datasetIndex + 1
    } (ângulo: <strong>${angulo}°</strong> e v<sub>0</sub>: <strong>${v0} m/s</strong>)`,
    data: y.map((val, index) => ({ x: x[index], y: val })),
    borderColor: getRandomColor(),
    backgroundColor: "rgba(40, 167, 69, 0.1)",
    fill: false,
  });

  addCheckbox(
    `Trajetória do Projétil ${
      datasetIndex + 1
    } (ângulo: <strong>${angulo}°</strong> e v<sub>0</sub>: <strong>${v0} m/s</strong>)`,
    datasetIndex
  );

  trajetoriaChart.update();

  clickCount++;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function addCheckbox(label, index) {
  const checkboxContainer = document.getElementById("checkboxes");
  const checkboxId = `checkbox-${index}`;
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxId;
  checkbox.checked = true;
  checkbox.addEventListener("change", function () {
    trajetoriaChart.data.datasets[index].hidden = !this.checked;
    trajetoriaChart.update();
  });

  const labelElement = document.createElement("label");
  labelElement.htmlFor = checkboxId;
  labelElement.innerHTML = label;

  const div = document.createElement("div");
  div.appendChild(checkbox);
  div.appendChild(labelElement);
  checkboxContainer.appendChild(div);
}

document.getElementById("angulo").addEventListener("input", function () {
  document.getElementById("anguloValue").textContent = this.value;
});

plotarTrajetoria();
