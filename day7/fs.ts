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
  let i = 0;

  const buildTree = (lines: string[]) => {
    const line = lines[i];
    const parent = dirStack.at(-1);

    i++;

    const asCommand = line.match(/^\$ ([a-z]{2})\s?(.*)$/);

    if (asCommand) {
      const [, command, arg] = asCommand;

      switch (command) {
        case 'cd': {
          if (arg === "..") {
            dirStack.pop();
            return;
          }

          const dirNode = createDirNode(arg);

          parent?.children.push(dirNode);
          dirStack.push(dirNode);
          buildTree(lines);
          break;
        }
        case 'ls':
          buildTree(lines);
      }
    }

    const asFile = line.match(/(\d+) (.+)/);

    if (asFile && parent?.type === "dir") {
      const [, size, filename] = asFile;
      parent.children.push(createFileNode(filename, Number.parseInt(size)));
      buildTree(lines);
    }

    if (i === lines.length) {
      return dirStack.pop();
    }

    buildTree(lines);
  };

  const tree = buildTree(lines);

  console.log('********', JSON.stringify(tree, null, 2));

  return 0;
};
