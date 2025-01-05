import * as Plot from "npm:@observablehq/plot";
import { parseDate, parseMemorySize } from "./utiities.js";

export function hardware_plot(hardware, { width, height } = {}) {
  let data = hardware
    .map((d) => {
      const parsedDate = parseDate(d["Release Date"]);
      const parsedRam = parseMemorySize(d["Base RAM"]);
      return {
        x: parsedDate,
        y: parsedRam,
        model: d.Model,
      };
    })
    .filter((d) => {
      const isValid = d.x != null && d.y != null;
      if (!isValid) {
        console.log("Filtered out entry:", d);
      }
      return isValid;
    });

  return Plot.plot({
    y: {
      grid: true,
      label: "RAM (GB)",
      nice: true,
    },
    x: {
      grid: true,
      label: "Release Date",
      type: "time",
      nice: true,
    },
    marks: [
      Plot.dot(data),
      Plot.text(data, {
        x: "x",
        y: "y",
        text: "model",
        dy: -8,
      }),
    ],
    height: 400,
    width: 800,
  });
}
