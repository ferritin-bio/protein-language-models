import * as d3 from "npm:d3";

export const parseDate = d3.timeParse("%b %Y");

export function parseMemorySize(str) {
  if (!str) return null;
  if (str === "Same as ESM2") return 3; // Special case handling
  if (str === "Available through repo") return null;
  const match = str.match(/~?(\d+)\s*(KB|MB|GB|TB|PB)?$/i);
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

export function munge_protein_models(models) {
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
