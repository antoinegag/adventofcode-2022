const fs = require("node:fs");
const readline = require("node:readline");

async function day4(inputPath) {
  const fileStream = fs.createReadStream(inputPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const stacks = [];
  let crateCount = 0;

  for await (const line of rl) {
    if (stacks.length === 0) {
      // Init stacks
      crateCount = (line.length + 1) / 4;
      for (let i = 0; i < crateCount; i++) {
        stacks.push([]);
      }
    }

    // Check if we're looking at the crate numbers, ignore it
    if (line[1] === "1") {
      continue;
    }

    if (line === "") {
      // Reverse all the lists because it's the reverse order yes
      for (let i = 0; i < stacks.length; i++) {
        const stack = stacks[i];
        stacks[i] = stack.reverse();
      }

      continue;
    }

    if (line[0] != "m") {
      // Initial crate reading
      for (let i = 1; i < crateCount + 1; i++) {
        const crate = line[(i - 1) * 3 + i];
        if (crate != " ") {
          stacks[i - 1].push(crate);
        }
      }
    } else {
      const [, count, , from, , to] = line.split(" ");

      const slice = stacks[from - 1].slice(-count);

      stacks[to - 1].push(...slice);

      stacks[from - 1] = stacks[from - 1].slice(0, -count);
    }
  }

  console.log({
    top: stacks.reduce((str, stack) => str + stack[stack.length - 1], ""),
  });
}

day4("input.txt");
