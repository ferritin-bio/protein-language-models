import * as Plot from "npm:@observablehq/plot";
import { parseDate, parseMemorySize } from "./utiities.js";

function munge_protein_models(models) {
  return models
    .map((d) => {
      const parsedDate = parseDate(d.Publication_Date);
      const parsedSize = parseMemorySize(d.TotalWeightsSize);
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

export function protein_model_plot(models, { width = 800, height = 400 } = {}) {
  let data = munge_protein_models(models);
  return Plot.plot({
    x: {
      grid: true,
      label: "Publication Date",
      type: "time",
      nice: true,
      domain: [new Date("2020-01-01"), new Date("2024-12-31")],
    },
    y: {
      grid: true,
      label: "Model Size (GB)",
      nice: true,
      domain: [0, 4],
    },
    marks: [
      Plot.dot(data),
      Plot.text(data, {
        x: "x",
        y: "y",
        text: "name",
        dy: -8,
      }),
    ],
    height,
    width,
  });
}
