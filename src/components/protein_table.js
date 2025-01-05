//

import * as Inputs from "npm:@observablehq/inputs";
import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { html } from "npm:htl";
import { parseDate, parseMemorySize } from "./utiities.js";
// import * as Academicons from "npm:academicons";
// import * as FontAwesome from "npm:font-awesome-icons";

// Process individual fields
function processName(row) {
  return row;
}

function processPublication(row) {
  row.Publication =
    row.Publication?.length > 40
      ? row.Publication.substring(0, 40) + "..."
      : row.Publication;
  return row;
}

function processPublicationURL(row) {
  if (!row.Publication_URL) return row;

  if (typeof row.Publication_URL !== "string") return row;

  let icon;
  if (row.Publication_URL.includes("pubmed")) {
    icon = html`<i class="ai ai-pubmed ai-2x"></i>`;
  } else if (row.Publication_URL.includes("biorxiv")) {
    icon = html`<i class="ai ai-biorxiv ai-2x"></i>`;
  } else if (row.Publication_URL.includes("arxiv")) {
    icon = html`<i class="ai ai-arxiv ai-2x"></i>`;
  } else {
    icon = html`<i class="fas fa-file-alt ai-2x"></i>`;
  }

  console.log(icon);
  row.Publication_URL = html`<a href="${row.Publication_URL}" target="_blank"
    >${icon}</a
  >`;
  return row;
}

function processPublicationDate(row) {
  return row;
}

function processVersion(row) {
  return row;
}

function processSourceURL(row) {
  if (!row.SourceURL) return row;

  if (typeof row.SourceURL !== "string") return row;

  let icon;
  if (row.SourceURL.includes("github")) {
    icon = html`<i class="fa fa-github fa-2x"></i>`;
  } else if (row.SourceURL.includes("gitlab")) {
    icon = html`<i class="fa fa-gitlab fa-2x"></i>`;
  } else {
    icon = html`<i class="fa fa-code fa-2x"></i>`; // Default icon for other source URLs
  }

  row.SourceURL = html`<a href="${row.SourceURL}" target="_blank">${icon}</a>`;
  return row;
}

function processWeightURL(row) {
  return row;
}

function processTotalWeightsSize(row) {
  return row;
}

function processArchitecture(row) {
  return row;
}

function processTrainingDataSize(row) {
  return row;
}

function processLicense(row) {
  return row;
}

function processHuggingFace(row) {
  return row;
}

function process_models(data) {
  console.log("processing the data!");
  return (
    data
      // .map((row) => processName(row))
      .map((row) => processPublication(row))
      .map((row) => processPublicationURL(row))
      // .map((row) => processPublicationDate(row))
      // .map((row) => processVersion(row))
      .map((row) => processSourceURL(row))
    // .map((row) => processWeightURL(row))
    // .map((row) => processTotalWeightsSize(row))
    // .map((row) => processArchitecture(row))
    // .map((row) => processTrainingDataSize(row))
    // .map((row) => processLicense(row))
    // .map((row) => processHuggingFace(row))
  );
}

export function protein_model_table(
  models,
  { width = 800, height = 400 } = {},
) {
  let data = process_models(models);
  console.log(data);
  return Inputs.table(data.map(processPublicationURL), {
    format: {
      Publication_URL: (d) => d,
      SourceURL: (d) => d,
    },
  });
}
