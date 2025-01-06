// // spreadsheet 1iJ7bPG81_yYITVQn-huoQonKTel7GBQ7AMM9AixQbH8
// // gid = 1996577388

const url = `https://docs.google.com/spreadsheets/d/1iJ7bPG81_yYITVQn-huoQonKTel7GBQ7AMM9AixQbH8/export?format=tsv&gid=1996577388`;

(async () => {
  const response = await fetch(url);
  const text = await response.text();
  process.stdout.write(text);
})();
