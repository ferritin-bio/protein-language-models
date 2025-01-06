//
import * as Inputs from "npm:@observablehq/inputs";
import { html } from "npm:htl";
// import { hf_icon } from "./utilities.js";

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

  console.log(row.Publication_URL);
  let icon;
  if (row.Publication_URL.includes("pubmed")) {
    icon = html`<i class="ai ai-pubmed ai-2x"></i>`;
  } else if (row.Publication_URL.includes("biorxiv")) {
    icon = html`<i class="ai ai-biorxiv ai-2x"></i>`;
  } else if (row.Publication_URL.includes("arxiv")) {
    icon = html`<i class="ai ai-arxiv ai-2x"></i>`;
  } else {
    icon = html`<i class="fa fa-file"></i>`;
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
  if (!row.HuggingFace) return row;

  if (typeof row.HuggingFace !== "string") return row;

  let icon;
  if (row.HuggingFace.includes("/")) {
    row.HuggingFace = html`<a
      href="https://huggingface.co/${row.HuggingFace}"
      target="_blank"
      >${row.HuggingFace}</a
    >`;
  }

  return row;
}

function processLinks(row) {
  let links = [];

  // Process Publication URL
  if (row.Publication_URL && typeof row.Publication_URL === "string") {
    let icon;
    if (row.Publication_URL.includes("pubmed")) {
      icon = html`<i class="ai ai-pubmed ai-2x"></i>`;
    } else if (row.Publication_URL.includes("biorxiv")) {
      icon = html`<i class="ai ai-biorxiv ai-2x"></i>`;
    } else if (row.Publication_URL.includes("arxiv")) {
      icon = html`<i class="ai ai-arxiv ai-2x"></i>`;
    } else {
      icon = html`<i class="fa fa-file"></i>`;
    }
    links.push(
      html`<a href="${row.Publication_URL}" target="_blank">${icon}</a>`,
    );
  }

  // Process Source URL
  if (row.SourceURL && typeof row.SourceURL === "string") {
    let icon;
    if (row.SourceURL.includes("github")) {
      icon = html`<i class="fa fa-github fa-2x"></i>`;
    } else if (row.SourceURL.includes("gitlab")) {
      icon = html`<i class="fa fa-gitlab fa-2x"></i>`;
    } else {
      icon = html`<i class="fa fa-code fa-2x"></i>`;
    }
    links.push(html`<a href="${row.SourceURL}" target="_blank">${icon}</a>`);
  }

  // Combine links with spacing
  row.Links = html`<div style="display: flex; gap: 10px; align-items: center;">
    ${links}
  </div>`;

  return row;
}

function process_models(data) {
  console.log("processing the data!");
  return (
    data
      // .map((row) => processName(row))
      .map((row) => processPublication(row))
      // .map((row) => processPublicationURL(row))
      // .map((row) => processPublicationDate(row))
      // .map((row) => processVersion(row))
      // .map((row) => processSourceURL(row))
      // .map((row) => processWeightURL(row))
      // .map((row) => processTotalWeightsSize(row))
      // .map((row) => processArchitecture(row))
      // .map((row) => processTrainingDataSize(row))
      // .map((row) => processLicense(row))
      .map((row) => processHuggingFace(row))
      .map((row) => processLinks(row))
  );
}

export function protein_model_table(
  models,
  { width = 800, height = 400 } = {},
) {
  let data = process_models(models);
  console.log(data);
  return Inputs.table(data, {
    rows: 25,
    columns: [
      "Name",
      "Publication",
      // "Publication_URL",
      // "SourceURL",
      // "WeightURL",
      "TotalWeightsSize",
      "Architecture",
      "License",
      "Links",
      "HuggingFace",
    ],
    names: {
      Publication_URL: "pubURL",
      // pubURL: "Publication_URL",
      SourceURL: "SourceURL",
    },
    format: {
      Publication_URL: (d) => d,
      SourceURL: (d) => d,
      Links: (d) => d,
      HuggingFace: (d) => d,
    },
  });
}
