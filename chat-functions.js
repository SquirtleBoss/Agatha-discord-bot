var Airtable = require('airtable');
var base = new Airtable({apiKey: process.env.airtablekey}).base(process.env.airtablebase);

async function retrieveRecord (user)  {
    base('Chats').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 1,
        filterByFormula: "{ID} = '"+ user + "'"
    }).eachPage(function page(records, fetchNextPage) {
        console.log("cp");
        //This function (`page`) will get called for each page of records.
        return records;
    }, function done(err) {
        if (err) { console.error(err); return; }
    });
}

