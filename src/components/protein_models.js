import * as Plot from "npm:@observablehq/plot";
import { parseDate, parseMemorySize } from "./utiities.js";

function munge_protein_models(models) {
  return models
    .map((d) => {
      const parsedDate = parseDate(d.Publication_Date);
      const parsedSize = parseMemorySize(d.ModelSize);
      return {
        x: parsedDate,
        y: parsedSize,
        name: d.Name,
      };
    })
    .filter((d) => {
      const isValid = d.x != null && d.y != null;
      if (!isValid) {
        console.log("Filtered out entry:", d);
      }
      return isValid;
    });
}

let isLogScale = false;

function toggleScale() {
  isLogScale = !isLogScale;
  const plot = protein_model_plot(models, { isLogScale });
  document.getElementById("plot-container").innerHTML = "";
  document.getElementById("plot-container").appendChild(plot);
}

export function createProteinModelPlot(models, container) {
  let isLogScale = false;

  // Create toggle button
  const button = document.createElement("button");
  button.textContent = "Toggle Log/Linear Scale";
  button.style.marginBottom = "10px";

  // Create plot container
  const plotDiv = document.createElement("div");

  // Add elements to container
  container.appendChild(button);
  container.appendChild(plotDiv);

  function updatePlot() {
    const data = munge_protein_models(models);

    // Configure y-axis based on scale type
    const yAxis = {
      grid: true,
      label: "Model Size (GB)",
      nice: true,
    };

    if (isLogScale) {
      yAxis.type = "log";
      yAxis.domain = [0.1, Math.max(...data.map((d) => d.y))];
    } else {
      yAxis.type = "linear";
      yAxis.domain = [0, Math.max(...data.map((d) => d.y))];
    }

    const plot = Plot.plot({
      aspectRatio: false,
      margin: 40,
      x: {
        grid: true,
        label: "Publication Date",
        type: "time",
        nice: true,
        domain: [new Date("2021-01-01"), new Date("2025-12-31")],
      },
      y: yAxis,
      marks: [
        Plot.dot(data, {
          r: 5,
          x: "x",
          y: "y",
          name: "Name",
          fill: "red",
          tip: true,
          title: (d) => `Model: ${d.name}`,
        }),
        Plot.text(data, {
          x: "x",
          y: "y",
          text: "name",
          dy: -8,
        }),
      ],
      height: 400,
      width: 1200,
    });

    // Clear and update plot
    plotDiv.innerHTML = "";
    plotDiv.appendChild(plot);
  }

  // Add click handler to button
  button.addEventListener("click", () => {
    isLogScale = !isLogScale;
    updatePlot();
  });

  // Initial plot render
  updatePlot();
}
