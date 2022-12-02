const fs = require("node:fs");
const readline = require("node:readline");

const fileStream = fs.createReadStream("input.txt");

async function day1() {
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let max = -1;
  let sum = 0;
  const sums = [];

  for await (const line of rl) {
    if (line === "") {
      if (sum > max) {
        max = sum;
      }

      sums.push(sum);

      sum = 0;
    } else {
      sum += parseInt(line);
    }
  }
  const topThree = sums
    .sort((a, b) => a - b)
    .reverse()
    .slice(0, 3)
    .reduce((sum, cal) => sum + cal, 0);

  console.log({ max, topThree });
}

day1();
