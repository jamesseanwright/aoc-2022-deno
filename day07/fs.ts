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

const buildTree = (input: string) => {
  const lines = input.split("\n");
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

const getDirSizes = (node: Node) => {
  const sizes: number[] = [];

  const traverse = (child: Node): number => {
    if (child.type === "dir") {
      const dirSize = child.children.reduce((n, c) => n + traverse(c), 0);

      sizes.push(dirSize);

      return dirSize;
    }

    return child.size;
  };

  traverse(node);

  return sizes;
};

export const sumSizeOfDirectoriesWithinSize = (
  input: string,
  maxDirSize: number,
) =>
  getDirSizes(buildTree(input))
    .filter((dirSize) => dirSize <= maxDirSize)
    .reduce((n, dirSize) => n + dirSize, 0);

export const findDeletionCandidate = (
  input: string,
  totalRequiredFreeSpace: number,
  diskSize: number,
) => {
  const sizes = getDirSizes(buildTree(input)).toSorted((a, b) => a - b);
  const usedSpace = sizes.at(-1) || 0;
  const unusedSpace = diskSize - usedSpace;
  const requiredSpace = totalRequiredFreeSpace - unusedSpace;

  return sizes.find((size) => size >= requiredSpace);
};
