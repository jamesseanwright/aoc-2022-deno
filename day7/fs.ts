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

export const sumSizeOfDirectoriesWithinSize = (input: string, size: number) => {
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

  const tree = dirStack[0];

  console.log('********', JSON.stringify(tree, null, 2));

  return 0;
};
