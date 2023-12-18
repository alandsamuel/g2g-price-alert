const fs = require('fs');
const moment = require('moment');

const read = () => {
    const data = fs.readFileSync('./data.json', { encoding: 'utf8', flag: 'r' });
    return JSON.parse(data)
};

const prepareData = (newData) => {
    const now = moment().format('YYYY-MM-DD h:mm');
    return {
        [now]: {
            ...newData
        }
    };
}

const write = (newData) => {
    const currentData = read();
    const preparedData = prepareData(newData);
    if(currentData) currentData.data.push(preparedData);
    fs.writeFileSync('./data.json', JSON.stringify(currentData), 'utf-8', (err) => {
        if (err) throw err;
        console.log('Data added to file');
    });
}

module.exports = {
    read,
    write
}