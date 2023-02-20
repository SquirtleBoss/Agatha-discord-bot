var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.airtablekey}).base(process.env.airtablebase);

var recordlist;

async function retrieveRecord (user)  {
    const ret = await base('Chats').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 1,
        filterByFormula: "{ID} = '"+ user + "'"
    }).firstPage();
    return ret;
}

module.exports = {retrieveRecord};