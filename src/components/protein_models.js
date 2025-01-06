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

export function protein_model_plot(
  models,
  { width = 1200, height = 400 } = {},
) {
  let data = munge_protein_models(models);
  return Plot.plot({
    aspectRatio: false,
    margin: 40,
    x: {
      grid: true,
      label: "Publication Date",
      type: "time",
      nice: true,
      domain: [new Date("2021-01-01"), new Date("2025-12-31")],
    },
    y: {
      grid: true,
      label: "Model Size (GB)",
      nice: true,
      domain: [0, 10],
    },
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
    height,
    width,
  });
}
