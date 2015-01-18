/**
 * Created by yicheng3 on 1/18/15.
 */
var profiles = require("./my.json");

console.log(profiles.length)

var count = 0;
for (var i=0;i<profiles.length;i++){
    if (profiles[i]!=null) {
        count++
        console.log(profiles[i].skinny.bodytype)


        for (var j=0;j<profiles[i].essays.length;j++){
            console.log(profiles[i].essays[j])
        }

        break
    }
}

//console.log(count)

