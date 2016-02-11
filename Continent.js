var fs = require('fs'),
        countriesMap={},
        continentAggMap={},
        continentAggList=[];
fs.readFile('country-continent-nm.csv', 'utf8', function (error, data) {
  if (error) throw error;
  //console.log(data);
    var tempData = data.split('\r\n');
    var headers = tempData[0].split(',');
     //console.log(data1.length);
     for (var i = 1; i < tempData.length-1; i++) {
       var contData = tempData[i].split(',');
       countriesMap[contData[0]]=contData[1];
  }
});

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
          createInitialMaps(heading);
        }

        if (result[3] =='AG.LND.ARBL.HA' && result[0] in countriesMap) {
          processAggregate(heading,result);
      }
      });

    rl.on('close', function (line) {
//        console.log('count'+count);
  //      console.log(continentAggMap);
      postProcessingAggregateData();
        fs.writeFile('json/Continent.json',JSON.stringify(continentAggList),function(err){
        });
    });
}
processFile('WDI_Data.csv');

function processAggregate(headingArray,inputArray){
  for (var i = 4; i < headingArray.length; i++) {
  var yrData=0;
  if(inputArray[i+1]!="" && inputArray[i+1]!=null && inputArray[i+1]!=undefined){
    yrData=inputArray[i+1];
    // console.log(yrData);
  }

  var tempContMap={};
  tempContMap=continentAggMap[headingArray[i]];
  tempContMap[countriesMap[inputArray[0]]]=parseFloat(tempContMap[countriesMap[inputArray[0]]])+parseFloat(yrData);
  continentAggMap[headingArray[i]]=tempContMap;

}

}
function createInitialMaps(headingArray){
  for (var i = 4; i < headingArray.length; i++) {
    var tempContMap={
      "year":parseInt(headingArray[i]),
      "EU":0,
      "AS":0,
      "NA":0,
      "AF":0,
      "SA":0,
      "OC":0
    }
  continentAggMap[headingArray[i]]=tempContMap;
  }
}
function postProcessingAggregateData(){
  var mapKeys= Object.keys(continentAggMap);
  var continentList=['EU','AS','NA','AF','SA','OC'];
  for (var i = 0; i < mapKeys.length; i++) {
    continentAggList.push(continentAggMap[mapKeys[i]]);
}
}
