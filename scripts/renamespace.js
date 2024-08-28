const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Create an interface for reading input from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt the user for input
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

// Function to recursively search and replace in files
const searchAndReplace = (dir, searchTerm, replaceTerm, dryRun) => {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (err, stat) => {
                if (err) throw err;

                if (stat.isDirectory()) {
                  // Skip .sfdx, .sf, and .git directories
                  if (file === '.sfdx' || file === '.git' || file === '.sf') {
                    return;
                }
                    searchAndReplace(filePath, searchTerm, replaceTerm, dryRun);
                } else {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) throw err;

                        if (data.includes(searchTerm)) {
                            if (dryRun) {
                                console.log(`- ${filePath}`);
                            } else {
                                const result = data.replace(new RegExp(searchTerm, 'g'), replaceTerm);
                                fs.writeFile(filePath, result, 'utf8', (err) => {
                                    if (err) throw err;
                                    console.log(`Replaced in file: ${filePath}`);
                                });
                            }
                        }
                    });
                }
            });
        });
    });
};

// Main function to execute the script
const main = async () => {
    const searchTerm = await prompt('Enter the term to search for: ');
    const replaceTerm = await prompt('Enter the term to replace with: ');
    const dryRunInput = await prompt('Run in dry run mode? (yes/no): ');
    const dryRun = dryRunInput.toLowerCase() === 'yes';

    searchAndReplace(path.join(__dirname, '../'), searchTerm, replaceTerm, dryRun);

    rl.close();
};

main();