const fs = require('fs');

exports.getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {

        if (err){
            cb([]);
        }

        else {
            try {
                cb(JSON.parse(fileContent));
            }

            catch (e){
                console.error("Error parsing JSON, resetting to an empty array.");
                cb([]);
            }
        }
    });
};