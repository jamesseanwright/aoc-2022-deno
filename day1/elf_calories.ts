export const getLargestTotal = (input: string) => {
    const groups = input.split("\n\n");

    let largest = 0;

    for (const group of groups) {
        const items = group.split("\n");
        const total = items.reduce((n, x) => n + Number.parseInt(x), 0);

        if (total > largest) {
            largest = total;
        }
    }

    return largest;
};
