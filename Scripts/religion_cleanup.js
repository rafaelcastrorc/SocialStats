var religion_data = require('../Data/religion2.json');
var fs = require('fs');


for (var i = 0; i < religion_data.length; i++) {
  for (var religion_pop in religion_data[i]) {
    if (religion_data[i][religion_pop] == 0) {
      delete religion_data[i][religion_pop]
    }
  }
}

religion_data = JSON.stringify(religion_data);

fs.writeFile("relgion2_clean.JSON", religion_data, function(err) {
    if(err) {
        return console.log(err);
    }
});
