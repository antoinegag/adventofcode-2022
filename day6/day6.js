const fs = require("node:fs");
const readline = require("node:readline");

async function day6(inputPath) {
  const fileStream = fs.createReadStream(inputPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const stacks = [];
  let crateCount = 0;

  for await (const line of rl) {
    for (let i = 3; i < line.length; i++) {
      const lastFour = line.slice(i - 13, i + 1);
      if (new Set(lastFour).size === 14) {
        console.log({ match: lastFour, pos: i + 1 });
        break;
      }
    }
  }
}

day6("input.txt");
