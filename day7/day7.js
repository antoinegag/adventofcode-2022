const fs = require("node:fs");
const readline = require("node:readline");

const NodeType = {
  File: "file",
  Directory: "dir",
};

function Node(name, type, size) {
  this.name = name;
  this.type = type;
  this.size = size;
  this.children = [];
  this.parent = null;

  this.setParentNode = function (node) {
    this.parent = node;
  };

  this.getParentNode = function () {
    return this.parent;
  };

  this.addChild = function (node) {
    node.setParentNode(this);
    this.children[this.children.length] = node;
  };

  this.getChildren = function () {
    return this.children;
  };

  this.removeChildren = function () {
    this.children = [];
  };
}

function printNode(node, level = 0) {
  console.log(
    `${" ".repeat(level)}- ${node.name} (${node.type}${
      node.type === NodeType.File ? `, size=${node.size}` : ""
    })`
  );

  for (const child of node.children) {
    printNode(child, level + 1);
  }
}

function sumDirSize(node) {
  return node.children.reduce(
    (sum, childNode) => sum + sumDirSize(childNode),
    node.size || 0
  );
}

// This is a dumb way to do this, I know
function findDirsUnder100k(node, level = 0, list = []) {
  for (const child of node.children) {
    if (child.type === NodeType.Directory && sumDirSize(child) <= 100_000) {
      list.push(child);
    }

    findDirsUnder100k(child, level + 1, list);
  }

  return list;
}

function findDirsOver(node, min, level = 0, list = []) {
  for (const child of node.children) {
    if (child.type === NodeType.Directory && sumDirSize(child) >= min) {
      list.push(child);
    }

    findDirsOver(child, min, level + 1, list);
  }

  return list;
}

async function day7(inputPath) {
  const fileStream = fs.createReadStream(inputPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let root = null;
  let currentNode = null;

  for await (const line of rl) {
    const [f, s, t] = line.split(" ");
    if (f === "$") {
      if (s === "cd") {
        if (t == "..") {
          currentNode = currentNode.parent;
          continue;
        }

        if (root == null) {
          const newDir = new Node(t, NodeType.Directory);
          root = newDir;
          currentNode = root;
          continue;
        }

        currentNode = currentNode.children.find((node) => node.name === t);
      } else if (s === "ls") {
        console.log("ls");
      }
    } else {
      if (f === "dir") {
        console.log("dir ", s);
        currentNode.addChild(new Node(s, NodeType.Directory));
      } else {
        console.log("file ", s, " of size ", f);
        currentNode.addChild(new Node(s, NodeType.File, parseInt(f)));
      }
    }
  }

  printNode(root);

  console.log({
    sumUnder100k: findDirsUnder100k(root).reduce(
      (sum, dir) => sum + sumDirSize(dir),
      0
    ),
  });

  const unusedSpace = 70000000 - sumDirSize(root);
  const missingSpace = 30000000 - unusedSpace;
  const candidates = findDirsOver(root, missingSpace);

  const smallest = Math.min(
    ...candidates.map((candidate) => sumDirSize(candidate))
  );

  console.log({
    smallest,
  });
}

day7("input.txt");
