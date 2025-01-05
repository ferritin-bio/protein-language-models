// Name,Publication,Publication_URL,Publication_Date,Version,SourceURL,WeightURL,TotalWeightsSize,Architecture,Training Data Size,License
// AlphaFold2,"Highly accurate protein structure prediction with AlphaFold",https://pubmed.ncbi.nlm.nih.gov/34265844/,Jul 2021,v2.3.1,https://github.com/deepmind/alphafold,https://storage.googleapis.com/alphafold/,~3GB,Transformer-based,~170,000 structures (PDB),Apache 2.0
// ESM2,"Language models of protein sequences at the scale of evolution enable accurate structure prediction",https://pubmed.ncbi.nlm.nih.gov/36477579/,Jan 2023,ESM-2,https://github.com/facebookresearch/esm,https://dl.fbaipublicfiles.com/fair-esm/models/,~3GB,Transformer,250M sequences,MIT
// ESMFold,"High-accuracy protein structure prediction with language models",https://www.biorxiv.org/content/10.1101/2022.07.20.500902v2,Dec 2022,v1,https://github.com/facebookresearch/esm/tree/main/examples/esmfold,Same as ESM2,~3GB,Transformer + Structure Module,Based on ESM2,MIT
// ProteinMPNN,"Neural network-based protein sequence design",https://pubmed.ncbi.nlm.nih.gov/36038635/,Jul 2022,v1,https://github.com/dauparas/ProteinMPNN,https://files.ipd.uw.edu/pub/training/weights/,~200MB,Message Passing Neural Network,PDB structures,MIT
// OpenFold,"OpenFold: Retraining AlphaFold2 from scratch",https://www.biorxiv.org/content/10.1101/2022.11.20.517210v2,Sep 2022,v1.0,https://github.com/aqlaboratory/openfold,Available through repo,~3GB,Similar to AlphaFold2,Same as AlphaFold2,Apache 2.0
// RoseTTAFold,"Accurate prediction of protein structures and interactions using a three-track neural network",https://pubmed.ncbi.nlm.nih.gov/34282049/,Jul 2021,v1,https://github.com/RosettaCommons/RoseTTAFold,Available through repo,~1GB,Three-track architecture,PDB + MSA data,MIT

import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

const parseDate = d3.timeParse("%b %Y");

function parseMemorySize(str) {
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
