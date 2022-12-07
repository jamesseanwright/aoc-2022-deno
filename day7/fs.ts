type Node = FileNode | DirNode;
type Children = Node[];

interface FileNode {
  type: "file";
  filename: string;
  size: number;
}

interface DirNode {
  type: "dir";
  dirname: string;
  children: Children;
}

const createFileNode = (filename: string, size: number): FileNode => ({
  type: "file",
  filename,
  size,
});

const createDirNode = (dirname: string): DirNode => ({
  type: "dir",
  dirname,
  children: [],
});

const buildTree = (lines: string[]) => {
  const dirStack: DirNode[] = [];

  for (const line of lines) {
    const parent = dirStack.at(-1);
    const [, command, arg] = line.match(/^\$ ([a-z]{2})\s?(.*)$/) || [];

    if (command === "cd") {
      if (arg === "..") {
        dirStack.pop();
      } else {
        const dirNode = createDirNode(arg);

        parent?.children.push(dirNode);
        dirStack.push(dirNode);
      }
    }

    const [, size, filename] = line.match(/(\d+) (.+)/) || [];

    if (filename && parent?.type === "dir") {
      parent.children.push(createFileNode(filename, Number.parseInt(size)));
    }
  }

  return dirStack[0];
};

const reduceTree = (node: Node, maxDirSize: number): number => {
  const withinSize: number[] = [];

  const traverse = (child: Node): number => {
    if (child.type === "dir") {
      const dirSize = child.children.reduce((n, c) => {
        const s = traverse(c);
        return n + s;
      }, 0);

      withinSize.push(dirSize);

      return dirSize;
    }

    return child.size;
  };

  traverse(node);

  return withinSize
    .filter((dirSize) => dirSize <= maxDirSize)
    .reduce((n, dirSize) => n + dirSize, 0);
};

export const sumSizeOfDirectoriesWithinSize = (
  input: string,
  maxDirSize: number,
) => reduceTree(buildTree(input.split("\n")), maxDirSize);
