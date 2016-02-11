var heading=[],
    hectors = [],
    yrValue3;

function processFile(inputFile) {
    var fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);

    rl.on('line', function (line) {
        var result = line.split(",");
        if(result[0] == 'Country Name'){
          heading =result;
        }else if(result[0] == 'India' && result[3] =='AG.LND.ARBL.HA') {
            arableHectars(heading,result);
        }
      });

    rl.on('close', function (line) {
      console.log(hectors);
        console.log('done reading file.');
        fs.writeFile('json/india_exercise3.json',JSON.stringify(hectors),function(err){
          if (err) {console.log(err);
          }else {
            console.log('Sucessfully done');
          }
      });
    });
}
processFile('WDI_Data.csv');

// "Arable land (hectares)"
function arableHectars(hArray1,fArray1){
for (var k = 4; k < hArray1.length; k++) {
  // var nValue;
  if (fArray1[k] == "") {
    yrValue3='0';
  }else {
    yrValue3 = parseFloat(fArray1[k]);
  }
  var data={
    year:hArray1[k] ,
    value:yrValue3
  }
  hectors.push(data)
}
}
