import fs from "fs";

const directory = "trips";

const inputFilePath = `C:/Users/Utilisateur/OneDrive/Bureau/projects/albi-bus/reseau-bus-albi/${directory}.txt`;
const outputFilePath =  `C:/Users/Utilisateur/OneDrive/Bureau/projects/albi-bus/reseau-bus-albi/${directory}.json`;

fs.readFile(inputFilePath, (error, d) => {
    if (error) throw error;

    const JSONList = [];
    const data = d.toString();
    const lines = data.split("\n");
    let InitialHeader;

    lines.forEach((line, index) => {
        if (line) {
            const elements = line.split(",");
            if (index !== 0) {
                JSONList.push({});
                InitialHeader.forEach((header, i) => {
                    JSONList[index - 1][header] = elements[i];
                });
            } else {
                InitialHeader = elements;
            }
        }
    });

    const jsonString = JSON.stringify(JSONList, null, 2);

    fs.access(outputFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            fs.writeFile(outputFilePath, jsonString, (writeError) => {
                if (writeError) throw writeError;
                console.log("File has been created and named routes.json!");
            });
            fs.unlink(inputFilePath, (error) => {
                if (error) throw error;
                console.log(".txt file has been deleted.")
            });
        } else {
            fs.writeFile(outputFilePath, jsonString, (writeError) => {
                if (writeError) throw writeError;
                console.log("File has been overwritten and named routes.json!");
            });
        }
    });
});
