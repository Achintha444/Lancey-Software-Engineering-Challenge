/**
 * Make a chain of dominoes.
 */
function dominoes(stones) {
    const valMap = new Map();
    const adjMap = new Map();

    // create graph and valMap
    for (let i = 0; i < stones.length; i++) {
        const [a, b] = stones[i];

        // Keep track of which dominoes contain which values
        valMap.set(a, (valMap.get(a) || 0) + 1);
        valMap.set(b, (valMap.get(b) || 0) + 1);

        if (!adjMap.has(a)) adjMap.set(a, []);
        if (!adjMap.has(b)) adjMap.set(b, []);
        adjMap.get(a).push({ to: b, index: i });
        adjMap.get(b).push({ to: a, index: i });
    }

    // check if the values are even
    for (let [key, count] of valMap) {
        if (count % 2 !== 0) return "NO";
    }

    // DFS-based Hierholzer’s algorithm to find a valid path
    const used = new Array(stones.length).fill(false);
    const result = [];

    function dfs(u) {
        const neighbors = adjMap.get(u);
        while (neighbors && neighbors.length) {
            const { to, index } = neighbors.pop();
            if (used[index]) continue;
            used[index] = true;

            const reverse = adjMap.get(to);
            const revIndex = reverse.findIndex(e => e.to === u && e.index === index);
            if (revIndex !== -1) reverse.splice(revIndex, 1);

            dfs(to);
            result.push([u, to]);
        }
    }

    dfs(stones[0][0]);

    if (result.length !== stones.length) return "NO";

    return result.reverse();
}

console.log(dominoes([[2,1], [2,3], [1,3]])); //[ [ 1, 2 ], [ 2, 3 ], [ 3, 1 ] ]
console.log(dominoes([[1,2], [4,1], [2,3]])); // NO
