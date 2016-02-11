var heading=[],
    perlandArea =[],
    yrValue1;

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
        }else if (result[0] == 'India' && result[3] == 'AG.LND.ARBL.ZS') {
          arableLandArea(heading,result);
        }
      });

    rl.on('close', function (line) {
      console.log(perlandArea);
        console.log('done reading file.');
        fs.writeFile('json/india_exercise.json',JSON.stringify(perlandArea),function(err){
          if (err) {console.log(err);
          }else {
            console.log('Sucessfully done');
          }
      });
    });
}
processFile('WDI_Data.csv');

//"Arable land (% of land area)"
function arableLandArea(headingArray,fileInputArray) {
            for (var i=4; i < headingArray.length; i++) {
              // var yrValue;
              if(fileInputArray[i]==""){
                yrValue1='0';
              }else{
                yrValue1=fileInputArray[i];
              }
              var data={
                year:headingArray[i],
                value:parseFloat(yrValue1)
              }
            perlandArea.push(data);
            // finalData.push(data);
            }
}
