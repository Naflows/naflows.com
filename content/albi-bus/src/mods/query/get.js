// get.js
async function get(directory) {
    const response = await fetch(`../../../reseau-bus-albi/${directory}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const content = await response.json();
    return content;
}

export default get;
