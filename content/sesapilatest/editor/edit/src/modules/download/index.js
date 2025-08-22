import { js_beautify } from "js-beautify";

const types = {
    "text" : "text/plain",
    "json" : "application/json"
}

function downloadFile(article, type) {
    if (!Object.keys(types).includes(type)) {
        throw Error('Error: undefined download type.')
    }
    var content = js_beautify(JSON.stringify(article));

    // Create a Blob with the file content
    var blob = new Blob([content], { type: types[type] });

    // Create a link element
    var link = document.createElement("a");

    link.download = article.general.name;
    link.href = window.URL.createObjectURL(blob);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function downloadImage(imageUrl,name) {
    var link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${name}.png`; // Set the desired file name for the downloaded image
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



export default downloadFile;