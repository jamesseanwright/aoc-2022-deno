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
  const lines = input
    .split("\n")
    .filter(Boolean); // for file line ending

  const buildTree = (lines: string[], dirs: Map<string, DirNode>, parent: Node, i = 0) => {
    const line = lines[i];
    const asCommand = line.match(/^\$ ([a-z]{2})\s?(.*)$/);

    if (asCommand) {
      const [, command, arg] = asCommand;

      switch (command) {
        case 'cd':
          if (arg === "..") {
            buildTree(lines, dirs, parent, i + 1);
          }

          buildTree(lines, new Map(), dirs.get(arg) || parent, i + 1);
          break;

        case 'ls':
          buildTree(lines, dirs, parent, i + 1);
      }
    }

    const asDir = line.match(/^dir ([a-z])$/);

    if (asDir && parent?.type === "dir") {
      const [, dirname] = asDir;
      const dirNode = createDirNode(dirname);

      parent.children.push(dirNode);
      dirs.set(dirname, dirNode);

      buildTree(lines, dirs, parent, i + 1);
    }

    const asFile = line.match(/(\d+) (.+)/);

    if (asFile && parent?.type === "dir") {
      const [, size, filename] = asFile;
      parent.children.push(createFileNode(filename, Number.parseInt(size)));
      buildTree(lines, dirs, parent, i + 1);
    }
  };

  const tree = createDirNode("/");

  buildTree(lines, new Map(), tree);

  console.log('********', JSON.stringify(tree, null, 2));

  return 0;
};
