---
title: Protein Language Models
# theme: dashboard
toc: true
---


# Protein Languge Models

```js
const plms = FileAttachment("./data/protein_language_models.csv").csv();
```

```js
plms
```


# Desktop hardware

```js
const hardware = FileAttachment("./data/desktop_hardware.csv").csv();
import {hardware_plot} from "./components/hardware.js";

 ```

```js
let hplot = hardware_plot(hardware);
```

```js
hplot
```
