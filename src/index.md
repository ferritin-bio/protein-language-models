---
title: Protein Language Models
toc: true
---



## Protein Language Models

```js
const plms = FileAttachment("./data/protein_language_models.csv").csv();
import {protein_model_plot} from "./components/protein_models.js";

```

```js
let plmplot = protein_model_plot(plms);
display(plmplot)
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
