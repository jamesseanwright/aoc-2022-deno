export const getNumberOfPermutationsWithUniqueSmallValues = (input: string) => {
  const vertices = input.split("\n");
  const paths = [];

  const traverse = (node: string, path: string[]) => {
    // We need to shallowly copy the path
    // rather than mutate it, otherwise
    // we'll erroneously append sibling
    // visitees from the above level to
    // a completed path when endNode is encountered
    const p = [...path, node];

    if (node === "end") {
      paths.push(p);
      return;
    }

    for (const neighbour of findNeighbours(vertices, node)) {
      const canRevisit = neighbour !== "start" && !neighbour.match(/[a-z]{2}/);

      if (canRevisit || !canRevisit && !p.includes(neighbour)) {
        traverse(neighbour, p);
      }
    }
  };

  traverse("start", ["start"]);

  return paths.length;
};

const findNeighbours = (vertices: string[], node: string) =>
  vertices.map((v) => {
    const matches = v.match(
      new RegExp(`${node}\-([a-zA-Z]{2,5})|([a-zA-Z]{2,5})\-${node}`),
    ) || [];

    return matches[1] || matches[2];
  })
    .filter(Boolean);
