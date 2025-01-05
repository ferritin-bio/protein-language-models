import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

const parseDate = d3.timeParse("%b %Y");

function parseMemorySize(str) {
  if (!str) return null;

  const match = str.match(/^(\d+)\s*(KB|MB|GB|TB|PB)?$/i);
  if (!match) return null;

  const [, value, unit = "GB"] = match;
  const multipliers = {
    KB: 1 / 1024 / 1024, // Convert to GB
    MB: 1 / 1024, // Convert to GB
    GB: 1, // Already in GB
    TB: 1024, // Convert to GB
    PB: 1024 * 1024, // Convert to GB
  };

  return Number(value) * multipliers[unit.toUpperCase()];
}

function munge_hardware(hardware) {
  return hardware
    .map((d) => {
      const parsedDate = parseDate(d["Release Date"]);
      const parsedRam = parseMemorySize(d["Base RAM"]);

      return {
        y: parsedDate,
        x: parsedRam,
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
}

export function hardware_plot(hardware, { width, height } = {}) {
  let data = munge_hardware(hardware);

  return Plot.plot({
    y: {
      grid: true,
      label: "Release Date",
      type: "time",
      nice: true,
    },
    x: {
      grid: true,
      label: "RAM (GB)",
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
