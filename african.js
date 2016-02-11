var fs = require('fs'),
        countries =[];
fs.readFile('country-continent-nm.csv', 'utf8', function (error, data) {
  if (error) throw error;
    var tempData = data.split('\r\n');
    var headers = tempData[0].split(',');
     for (var i = 1; i < tempData.length; i++) {
       var contData = tempData[i].split(',');
       if (contData[1] == "AF") {
       countries.push(contData[0]);
          }
     }
    // console.log(countries);
});

//second Program: Plot bar chart of the "Arable land (% of land area)" for African countries in the year 2010.

var heading=[],
    temp=[];

    count=0;

function processFile(inputFile) {
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);

    rl.on('line', function (line) {
        var result = line.split(",");
        if(result[0] == 'Country Name'){
          heading =result;
      //    console.log(heading);
        }

        if (result[2] == "Arable land (% of land area)" && (countries.indexOf(result[0])!=-1)) {
          count++;
        console.log(result[0]+" : "+result[54]);

        var tempData={};
        tempData["value"]=parseFloat(result[54]);
        tempData["country"]=result[0];
        temp.push(tempData);
      }

      });

    rl.on('close', function (line) {
        console.log('count'+count);
        console.log('done reading file.');
        fs.writeFile('json/af_arable.json',JSON.stringify(temp),function(err){
        });
    });
}
processFile('WDI_Data.csv');
