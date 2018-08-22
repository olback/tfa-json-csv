const fs = require('fs');

// Parse json
const data = JSON.parse(fs.readFileSync('data.json').toString());

//let csv = 'Category, Key, Name, Url, Facebook, Twitter, Tfa, Sms, Phone, Hardware, Software, Doc, Lang, Img, Exceptions';
// Reg: ("name"|"url"|"tfa"|"software"|"hardware"|"phone"|"img"|"sms"|"email"|"doc"|"twitter"|"facebook"|"lang"|"email_address")

const properties = [
    'name',
    'url',
    'tfa',
    'software',
    'hardware',
    'phone',
    'sms',
    'email',
    'twitter',
    'facebook',
    'email_address',
    'img',
    'doc',
    'lang',
];

let csv = `category,${properties.join(',')}\n`;

for (let i in data) {

    for (let j in data[i]) {

        let line = [i];

        properties.forEach(entry => {

            const item = data[i][j][entry];

            // Make sure that values that are set to false are show as false, not ''.
            if (typeof item === 'boolean') {

                line.push(item);

            } else {

                line.push(item ? item : '');

            }

        });

        csv += `${line.join(',')}\n`;
        console.log(`${line.join(',')}`);

    }

}

// Write to output to file
fs.writeFileSync('data.csv', csv, 'utf8');
