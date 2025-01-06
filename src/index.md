---
title: Protein Language Models
toc: true
---



 <!-- Todo: move this to a proper import -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>


## Into to Local-First Protein Language Models

- There has been a proliferation of really powerful AI models to assist in scientific discovery.
- We have seen a shrinking of the commercial LLMs where [LLAMA 3.3](https://ollama.com/library/llama3.3) can now be run on a machine with 548GB of RAM.
- Some of the powerful ML models like ProteinMPNN and Ligand MPNN are only ~20MB!!!
- At the same time we've gotten really powerful desktop harward that increasingly can handle ML models locally via GPUs or CPU acceleration. Apples Metal framework seems to be expesially good.
- Can we develop local machine learning tools that can acccelerate scientists in their effort to use these tools.
- That was the idea behind [ferritin-bio](https://ferritin-bio.github.io/ferritin/) - port common ML models to compile and run locally.




### Model Size by Release Date
```js
const plms = FileAttachment("./data/protein_language_models.tsv").tsv();
// import {protein_model_plot } from "./components/protein_models.js";
import {createProteinModelPlot } from "./components/protein_models.js";
import {protein_model_table } from "./components/protein_table.js";
```



<div id="plm-plot-01"></div>

```js
const container = document.getElementById('plm-plot-01');
let plmplot = createProteinModelPlot(plms, container);
```

</br>

### Protein Language Model Table

```js
let plmtable = protein_model_table(plms);
display(plmtable);

```


</br>

## Desktop Hardware

This is highlighting the release year and basic specs of available Desktop hardware. At the moment focusing on the Mac M-series machines. This is related
to a broader interest in making machine learning models that can be used locally.


</br>

### Hardware Table

```js
const hardware = FileAttachment("./data/desktop_hardware.tsv").tsv();
import {hardware_plot} from "./components/hardware.js";
```

```js
let hplot = hardware_plot(hardware);
display(hplot)
```

</br>

Data for these charts can be  found at this [gSheet](https://docs.google.com/spreadsheets/d/1iJ7bPG81_yYITVQn-huoQonKTel7GBQ7AMM9AixQbH8/edit?gid=1996577388#gid=1996577388). Source code for the graphs are [here](https://github.com/ferritin-bio/protein-language-models)
