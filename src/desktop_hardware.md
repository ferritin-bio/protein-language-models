---
title: Desktop hardware
---

# File Attachment

```js
const hardware = FileAttachment("./data/desktop_hardware.csv").csv();
```

```js
hardware
```

```js
const parseDate = d3.timeParse("%b %Y")

function parseMemorySize(str) {
  if (!str) return null;

  const match = str.match(/^(\d+)\s*(KB|MB|GB|TB|PB)?$/i);
  if (!match) return null;

  const [, value, unit = 'GB'] = match;
  const multipliers = {
    'KB': 1/1024/1024,      // Convert to GB
    'MB': 1/1024,           // Convert to GB
    'GB': 1,                // Already in GB
    'TB': 1024,             // Convert to GB
    'PB': 1024 * 1024      // Convert to GB
  };

  return Number(value) * multipliers[unit.toUpperCase()];
}


const data = hardware.map(d => {
  const parsedDate = parseDate(d["Release Date"]);
  const parsedRam = parseMemorySize(d["Base RAM"]);

  console.log("Processing entry:", {
    original: d["Release Date"],
    parsedDate,
    originalRam: d["Base RAM"],
    parsedRam
  });

  return {
    y: parsedDate,
    x: parsedRam,
    model: d.Model
  };
}).filter(d => {
  const isValid = d.x != null && d.y != null;
  if (!isValid) {
    console.log("Filtered out entry:", d);
  }
  return isValid;
});

let p = Plot.plot({
  y: {
    grid: true,
    label: "Release Date",
    type: "time",
    nice: true
  },
  x: {
    grid: true,
    label: "RAM (GB)",
    nice: true
  },
  marks: [
    Plot.dot(data),
    Plot.text(data, {
      x: "x",
      y: "y",
      text: "model",
      dy: -8
    })
  ],
  height: 400,
  width: 800
})

p
```

```js
p
```


```txt
Vendor, Model, Base RAM, Release Date, Max RAM, CPU Cores, GPU Cores, Neural Engine
Apple, M1, 8GB, Nov 2020, 16GB, 8 (4P+4E), 7/8, 16-core
Apple, M1 Pro, 16GB, Oct 2021, 32GB, 8/10 (6/8P+2E), 14/16, 16-core
Apple, M1 Max, 32GB, Oct 2021, 64GB, 10 (8P+2E), 24/32, 16-core
Apple, M1 Ultra, 64GB, Mar 2022, 128GB, 20 (16P+4E), 48/64, 32-core
Apple, M2, 8GB, Jun 2022, 24GB, 8 (4P+4E), 8/10, 16-core
Apple, M2 Pro, 16GB, Jan 2023, 32GB, 10/12 (6/8P+4E), 16/19, 16-core
Apple, M2 Max, 32GB, Jan 2023, 96GB, 12 (8P+4E), 30/38, 16-core
Apple, M2 Ultra, 64GB, Jun 2023, 192GB, 24 (16P+8E), 60/76, 32-core
Apple, M3, 8GB, Oct 2023, 24GB, 8 (4P+4E), 10, 16-core
Apple, M3 Pro, 18GB, Oct 2023, 36GB, 12 (6P+6E), 18, 16-core
Apple, M3 Max, 36GB, Oct 2023, 128GB, 16 (12P+4E), 40, 16-core
