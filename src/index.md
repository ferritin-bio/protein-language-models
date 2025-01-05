---
title: Protein Language Models
toc: true
---

 <!-- Todo: move this to a proper import -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>


## Protein Language Models

```js
const plms = FileAttachment("./data/protein_language_models.tsv").csv();
import {protein_model_plot } from "./components/protein_models.js";
import {protein_model_table } from "./components/protein_table.js";

```

```js
let plmplot = protein_model_plot(plms);
display(plmplot)
```

```js
let plmtable = protein_model_table(plms);
display(plmtable);

```



## Desktop Hardware

This is highlighting the release year and basic specs of abailabel Desktop softare. At the moment focusing on the Mac M-series machines.

```js
const hardware = FileAttachment("./data/desktop_hardware.csv").csv();
import {hardware_plot} from "./components/hardware.js";
```

```js
let hplot = hardware_plot(hardware);
display(hplot)
```
