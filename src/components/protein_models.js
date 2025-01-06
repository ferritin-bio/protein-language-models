import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
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

function formatTooltip(d) {
  return `Model: ${d.name}
Size in GB: ${d.y}`;
}

export function createProteinModelPlot(models, container) {
  let isLogScale = true; // Default to log scale
  let showLabels = false; // Default to showing labels

  // Create button container for better layout
  const buttonContainer = document.createElement("div");
  buttonContainer.style.marginBottom = "10px";

  // Scale toggle button
  const scaleButton = document.createElement("button");
  scaleButton.textContent = "Toggle Log/Linear Scale";
  scaleButton.style.marginRight = "10px";

  // Label toggle button
  const labelButton = document.createElement("button");
  labelButton.textContent = "Toggle Labels";

  // Add buttons to container
  buttonContainer.appendChild(scaleButton);
  buttonContainer.appendChild(labelButton);

  const plotDiv = document.createElement("div");
  container.appendChild(buttonContainer);
  container.appendChild(plotDiv);

  function updatePlot() {
    const data = munge_protein_models(models);

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

    const marks = [
      // Points are always shown
      Plot.dot(data, {
        r: 4,
        x: "x",
        y: "y",
        fill: "red",
        tip: true,
        title: formatTooltip,
      }),
    ];

    // Only add labels if showLabels is true
    if (showLabels) {
      marks.push(
        Plot.text(data, {
          x: "x",
          y: "y",
          text: "name",
          fontSize: 12,
          fill: "black",
          dy: -10,
        }),
      );
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
      marks: marks,
      height: 400,
      width: 1200,
    });

    plotDiv.innerHTML = "";
    plotDiv.appendChild(plot);
  }

  // Add click handlers to buttons
  scaleButton.addEventListener("click", () => {
    isLogScale = !isLogScale;
    updatePlot();
  });

  labelButton.addEventListener("click", () => {
    showLabels = !showLabels;
    updatePlot();
  });

  // Initial plot render
  updatePlot();
}
