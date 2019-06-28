import React, { Component } from 'react';
import './App.css';
import Sidenav from './Components/Sidenav.js';
import Chart from  './Components/revChart.js';
import firebase from 'firebase';
import {Config} from './Config.js';
import './Variables.js'

class App extends Component {

  constructor(props){
    super(props);
    this.app = firebase.initializeApp(Config);
    this.database = this.app.database().ref();
    
  }

  componentWillMount(){

    var ts1;
    var ts2;
    var ts3;
    var pauseTime;
    var startTime;
    var endTime;
    var dataset;
    var keys;
    var id;
    //var chargeStation;
    var state;
    var power;
    var kwhr;
    var costprice;

    function diffMinutes(start, end){
      var diff = (end-start)/1000;
      diff = diff / 60;
      return Math.abs(Math.round(diff));
      //return start;
    }

    /* DISREGARD!! THIS CALLS ON A SNAPSHOT OF THE ENTIRE DATABASE, NOT JUST ONE CHILD
    this.database.on('value', snap =>{

      //takes snapshot of entire database
      this.dataset = snap.val();

      //gets keys (charger id's) from every object and makes array of them
      keys = Object.keys(this.dataset);
      console.log(keys);

      for( var i = 0; i < keys.length-2; i++){

          if(keys[i] === '123456789'){

            this.id = keys[i];
            this.chargeStation = this.dataset[this.id];
            this.stateNum = parseInt(this.chargeStation['EVSE State'], 10);
            console.log(this.stateNum + "HERE");
          }
        }
    });
    */

    this.database.orderByKey().equalTo('123456789').on('value', function(snapshot){

      //console.log(snapshot.val());
      var s1 = snapshot.val();
      var key1 = Object.keys(snapshot.val());
      var obj1 = s1[key1]
      //console.log(obj1);
      global.chargeStation = obj1;
      global.state = global.chargeStation['EVSE State'];
      console.log(global.state + ' = EVSE State ');



      //These are the variables we will be using to product the Y axis
      /// Y axis is KW used per hour for that charge

      console.log(global.chargeStation['EVSE State'] + ' EVSE State TEST HERE!!');

      var current = parseInt(global.chargeStation['EVSE Current Level'], 10);
      //console.log('current = ' + current);

      var voltage = parseInt(global.chargeStation['EVSE Voltage'], 10);
      //console.log('voltage = ' + voltage);

      var time = parseInt(global.chargeStation['Time'],10);
      //console.log('time = ' + time);

      var cost = parseInt(global.chargeStation['EVSE Charge Cost'],10);
      //console.log('cost = ' + cost);

      power = (current * voltage) / 1000;
      kwhr = ((power) / (time/3600)) ;
      costprice = power * cost;


      if(current < 30){
        global.throttle = true;
      }
      else if(current == 30){
        global.throttle = false;
      }
      else{
        console.log( 'valid current level not recorded');
      }

      // If state changes to 3, then create start time stamp
      if(global.state === 3){

        ts3 = new Date();
        startTime  = ts3.getTime();
        //var startTime = ts1.toTimeString();
        console.log('This state is 3 ');
        //PUSH TIME STAMP TO FIREBASE
        snapshot.ref.update({"SERVER Time Start EVSE": startTime});

        // if throttle is enabled during charge
        if (global.throttle){

          //time stamp 2 for throttle begins
          var throttleStart = new Date();
          var throttleUTCStart = throttleStart.getTime();


        }

        //if throttle is disabled during charge
        else if (global.throttle == false){

          //time stamp 2 for throttle ending

          var throttleEnd = new Date();
          var throttleUTCEnd = throttleEnd.getTime();

          //total throttle time
          var totalTime = timeDiff(throttleUTCStart, throttleUTCEnd);

        }


        //this.database.child('123456789/SERVER Time Start EVSE').set(startTime);
      }

      // If state changes to 2, then creates end time stamp condition
      else if (global.state === 2) {

        ts2 = new Date();
        endTime  = ts2.getTime();

        //PUSH TIME STAMP TO FIREBASE
        snapshot.ref.update({"SERVER Time End EVSE": endTime});
        //global.chargeStation.child('123456789/SERVER Time End EVSE').set(endTime);
        var timeDiff = diffMinutes(global.chargeStation['SERVER Time Start EVSE'], global.chargeStation['SERVER Time End EVSE']);


        //var timeDiff = this.diff_minutes(startTime,endTime);
        //global.chargeStation.child('123456789/timeDiff').set(timeDiff);
        console.log('TIME DIFF IS: ' + timeDiff);
      }

      // If state changes to 1, then creates pause time stamp condition
      else if (global.state === 1) {

        // Creates regular time stamp
        ts1 = new Date();

        //creates UTC time so we can subtract
        pauseTime  = ts1.getTime();

        //PUSH TIME STAMP TO FIREBASE
        snapshot.ref.update({"SERVER Pause EVSE": pauseTime});
        //this.database.child('123456789/SERVER Pause EVSE').set(pauseTime);
        console.log('This is the pause time for state ' + state + ' time:'+ pauseTime);


      }

      // Any other state this message prints out
      else{
        console.log('This state is not valid!');
      }


      //Throttling code starts here




    });

  }

  render() {

    return (

      <div className="wrapper">
        <Sidenav />

        <div id="content">

          <Chart title = "Utility Usage" value = {global.state} />
          <Chart title = "Charging Utilization Cost" value = {global.state + 3}/>
          <Chart title = "Power Flow" value = {global.state + 10}/>

        </div>
      </div>

    );
  }
}

export default App;
