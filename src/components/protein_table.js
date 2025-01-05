//

import * as Inputs from "npm:@observablehq/inputs";
import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { html } from "npm:htl";
import { parseDate, parseMemorySize } from "./utiities.js";
import * as Academicons from "npm:academicons";

export function protein_model_table(
  models,
  { width = 800, height = 400 } = {},
) {
  return Inputs.table(models);
}
