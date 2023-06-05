  // Import the functions you need from the SDKs you need
  import "./plotly-2.16.1.min.js";
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getDatabase,ref,onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBHMMMgc6ODzx_po4ULuH9S3-GpTPOsrCE",
    authDomain: "diseno-jardinerito.firebaseapp.com",
    databaseURL: "https://diseno-jardinerito-default-rtdb.firebaseio.com",
    projectId: "diseno-jardinerito",
    storageBucket: "diseno-jardinerito.appspot.com",
    messagingSenderId: "37408784160",
    appId: "1:37408784160:web:d585ba28a6cd71dc396145",
    measurementId: "G-4JTHJCMCVN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);


var tdsValue = document.getElementById("Humedad"); 
var Ph2 = document.getElementById("Luminosidad");
var Ph3 = document.getElementById("Ph");
var Ph4 = document.getElementById("Temperatura"); 

const tdsValueRef = ref(db, "Jardinerito/Sensores/Humedad"); 
const PhRef = ref(db, "Jardinerito/Sensores/Luminosidad");
const PhRef1 = ref(db, "Jardinerito/Sensores/Ph");
const PhRef2 = ref(db, "Jardinerito/Sensores/Temperatura"); 

var Humedad = [], Luminosidad = [], PhValor = [], Temperatura = []; 
var TempH, TempL, TempP, TempT;

onValue(tdsValueRef,(snapshot) => {
    tdsValue.innerText=snapshot.key + ": " + snapshot.val();
    Humedad.push(snapshot.val());
});
onValue(PhRef,(snapshot) => {
    Ph2.innerText=snapshot.key + ": " + snapshot.val();
    Luminosidad.push(snapshot.val());
});
onValue(PhRef1,(snapshot) => {
    Ph3.innerText=snapshot.key + ": " + snapshot.val();
    PhValor.push(snapshot.val());
});
onValue(PhRef2,(snapshot) => {
    Ph4.innerText=snapshot.key + ": " + snapshot.val();
    Temperatura.push(snapshot.val());
}); 

function Hume(){
    var j=0;
    Humedad.forEach(function(dato)
    { j = dato; })
    if(j>65)
    {
        document.getElementById("AlertaHALTA").innerHTML="HUMEDAD ALTA";
        document.getElementById("AlertaHOK").innerHTML=" ";
        document.getElementById("AlertaHBAJA").innerHTML=" ";
    }
    else if(j>=55 && j<=65)
    {
        document.getElementById("AlertaHALTA").innerHTML=" ";
        document.getElementById("AlertaHOK").innerHTML="HUMEDAD OK";
        document.getElementById("AlertaHBAJA").innerHTML=" ";
    }
    else
    {
        document.getElementById("AlertaHALTA").innerHTML=" ";
        document.getElementById("AlertaHOK").innerHTML=" ";
        document.getElementById("AlertaHBAJA").innerHTML="HUMEDAD BAJA";
    }
    return j;
}

function Lumi(){
    var j=0;
    Luminosidad.forEach(function(dato)
    { j = dato; })
    if(j>8)
    {
        document.getElementById("AlertaLALTA").innerHTML="LUMINOSIDAD ALTA";
        document.getElementById("AlertaLOK").innerHTML=" ";
        document.getElementById("AlertaLBAJA").innerHTML=" ";
    }
    else if(j>=4 && j<=8)
    {
        document.getElementById("AlertaLALTA").innerHTML=" ";
        document.getElementById("AlertaLOK").innerHTML="LUMINOSIDAD OK";
        document.getElementById("AlertaLBAJA").innerHTML=" ";
    }
    else
    {
        document.getElementById("AlertaLALTA").innerHTML=" ";
        document.getElementById("AlertaLOK").innerHTML=" ";
        document.getElementById("AlertaLBAJA").innerHTML="LUMINOSIDAD BAJA";
    }
    return j;
}

function Ph(){
    var j=0;
    PhValor.forEach(function(dato)
    { j = dato; })
    if(j>8)
    {
        document.getElementById("AlertaPALTA").innerHTML="Ph ALTA";
        document.getElementById("AlertaPOK").innerHTML=" ";
        document.getElementById("AlertaPBAJA").innerHTML=" ";
    }
    else if(j>=6 && j<=8)
    {
        document.getElementById("AlertaPALTA").innerHTML=" ";
        document.getElementById("AlertaPOK").innerHTML="Ph OK";
        document.getElementById("AlertaPBAJA").innerHTML=" ";
    }
    else
    {
        document.getElementById("AlertaPALTA").innerHTML=" ";
        document.getElementById("AlertaPOK").innerHTML=" ";
        document.getElementById("AlertaPBAJA").innerHTML="Ph BAJA";
    }
    return j;
}

function Temp(){
    var j=0;
    Temperatura.forEach(function(dato)
    { j = dato; })
    if(j>20)
    {
        document.getElementById("AlertaTALTA").innerHTML="TEMPERATURA ALTA";
        document.getElementById("AlertaTOK").innerHTML=" ";
        document.getElementById("AlertaTBAJA").innerHTML=" ";
    }
    else if(j>=16 && j<=20)
    {
        document.getElementById("AlertaTALTA").innerHTML=" ";
        document.getElementById("AlertaTOK").innerHTML="TEMPERATURA OK";
        document.getElementById("AlertaTBAJA").innerHTML=" ";
    }
    else
    {
        document.getElementById("AlertaTALTA").innerHTML=" ";
        document.getElementById("AlertaTOK").innerHTML=" ";
        document.getElementById("AlertaTBAJA").innerHTML="TEMPERATURA BAJA";
    }
    return j;
}

var time = Date();
var H1 = {
    x:[],
    y:[],
    name: 'Humedad',
    mode:'lines',
    line:{color:'#0F56F1'}
}

var L2 = {
    x:[],
    y:[],
    name: 'Luminosidad',
    mode:'lines',
    line:{color:'#FFFF00 '}
}

var P3 = {
    x:[],
    y:[],
    name: 'Ph',
    mode:'lines',
    line:{color:'#008000'}
}

var T4 = {
    x:[],
    y:[],
    name: 'Temperatura',
    mode:'lines',
    line:{color:'#CD5C5C'}
}

var data =[H1,L2,P3,T4];
Plotly.newPlot('myDiv',data);
var cnt=0;
var interval = setInterval(function(){ 
    var time = new Date();
    var update = {
        x:[[time],[time],[time],[time]],
        y:[[Hume()],[Lumi()],[Ph()],[Temp()]]
    }
    var olderTime = time.setMinutes(time.getMinutes()-1);
    var futureTime = time.setMinutes(time.getMinutes()+1);

    var minuteView = {
        xaxis:{
            type: 'date',
            range: [olderTime,futureTime]
        }
    };

    Plotly.relayout('myDiv',minuteView);
    Plotly.extendTraces('myDiv',update,[0,1,2,3]);

    if(++cnt===1000) clearInterval(interval);

},1000);


