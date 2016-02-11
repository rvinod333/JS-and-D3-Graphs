var heading=[],
    hectperson = [],
    yrValue2;

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
        }else if(result[0] == 'India' && result[3] == 'AG.LND.ARBL.HA.PC') {
          arableHectarPerson(heading,result);
        }
      });

    rl.on('close', function (line) {
      console.log(hectperson);
        console.log('done reading file.');
        fs.writeFile('json/india_exercise2.json',JSON.stringify(hectperson),function(err){
          if (err) {console.log(err);
          }else {
            console.log('Sucessfully done');
          }
      });
    });
}
processFile('WDI_Data.csv');


//"Arable land (hectares per person)"
function arableHectarPerson(hArray,fArray) {
  for (var j=4; j < hArray.length; j++) {
    // var nValue;
    if (fArray[j] == "") {
      yrValue2='0';
    }else {
      yrValue2=fArray[j];
    }
    var data={
      year:hArray[j] ,
      value:parseFloat(yrValue2)
    }
    hectperson.push(data)
    // finalData.push(data);
  }
}
