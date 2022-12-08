const fs = require("node:fs");
const readline = require("node:readline");

async function day4(inputPath) {
  const fileStream = fs.createReadStream(inputPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let fullyOverlapPair = 0;
  let overlapPair = 0;

  for await (const line of rl) {
    const [first, second] = line.split(",");
    const [firstFirst, firstLast] = first.split("-");
    const [secondFirst, secondLast] = second.split("-");

    const ff = parseInt(firstFirst);
    const fl = parseInt(firstLast);
    const sf = parseInt(secondFirst);
    const sl = parseInt(secondLast);

    if ((ff <= sf && fl >= sl) || (sf <= ff && sl >= fl)) {
      fullyOverlapPair += 1;
    }

    if (ff <= sl && sf <= fl) {
      overlapPair += 1;
    }
  }

  console.log({ fullyOverlapPair, overlapPair });
}

day4("input.txt");
