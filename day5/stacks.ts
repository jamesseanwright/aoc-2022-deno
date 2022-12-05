export const arrangeStacks = (input: string) => {
    const [rawStacks, rawCommands] = input.split("\n\n");

    const rows = rawStacks.split("\n");

    const n = Number.parseInt([...(rows.at(-1) || "").matchAll(/\s(\d)$/g)]
        .at(-1)
        ?.at(0) || "-1");

    const stacks: string[][] = [];

    console.log('*******', n)

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < rows.length - 1; j++) {
            if (!stacks[i]) {
                stacks[i] = [];
            }

            const item = (rows[j].match(/\s{3}|\[[A-Z]\]/g) || [])[i];

            if (item && item.trim() !== '') {
                stacks[i][j] = item;
            }
        }
    }

    const commands = [...rawCommands.matchAll(/move (\d) from (\d) to (\d)/g)];

    return "";
};
