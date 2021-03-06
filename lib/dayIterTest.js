dayIter=false;
try {
    dayIter = require('./dayIter');
} catch (e) {}
try {
    dayIter = require('./lib/dayIter');
} catch (e) {}


var epoch = new Date("2008-07-30T00:00:00Z");
var today = new Date();
var weekAgo = dayIter.incrDay(today,-7);
console.log('epoch :: ',epoch.toISOString());
console.log('today :: ',today.toISOString());
console.log('weekAgo :: ',weekAgo.toISOString());

function loopAndThen(name,thenCB){
    return function(day,next){
        console.log('  '+name+'::work for iter',day.toISOString()); 
        if (next) next();
        else {
            console.log('  '+name+':: is done'); 
            if (thenCB) thenCB();
            else {
                console.log('Nothing left to do');
            }
        }
    };    
}

function todayOnly(){
    console.log('--- today only ---');
    dayIter.iter(null,null,null,loopAndThen('today',weekUp));
}

function weekUp(){
    console.log('--- this week up ---');
    dayIter.iter(weekAgo,today,null,loopAndThen('week up',weekDown));
}
function weekDown(){
    console.log('--- this week down by 2 ---')
    dayIter.iter(today,weekAgo,-2,loopAndThen('week down by 2',allTimeUp));
}
function allTimeUp(){
    console.log('--- alltime up by 73 ---')
    dayIter.iter(epoch,null,73,loopAndThen('allTime up by 73',floorTest));
}

function floorTest(){
    var floor = dayIter.floor;
    [epoch,weekAgo,today].forEach(function(d,idx,ary){
        console.log('floor test::',d.toISOString());
        [false,true].forEach(function(useLocal){
            ['second','minute','hour','day','month','year'].forEach(function(scope){
            //['day','month','year'].forEach(function(scope){
                console.log('  ',floor(d,scope,useLocal).toISOString(),'  '+(useLocal?'LCL':'UTC')+'::'+scope);
            });
        });
    });
}

todayOnly();
