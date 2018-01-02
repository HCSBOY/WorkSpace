var header = document.querySelector('header');
var section = document.querySelector('section');      
var number_element = null;
var number = null;
var ind = null;

function processFormData() {
  number_element = document.getElementById("enterNum");
  number = number_element.value;
  ind = parseInt(number)-1;
  alert(ind); 
  window.location = "./readAtt.html";            
}
               
var requestURL = 'https://hcsboy.github.io/WorkSpace/LotteryApp/attendance.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
  request.onload = function() {
    var attendance = request.response;
    populateHeader(attendance);
    showAttendance(attendance);
}

function populateHeader(jsonObj) {
  var myH1 = document.createElement('h1');
  myH1.textContent = jsonObj['CompanyName'];
  header.appendChild(myH1);
  var myPara = document.createElement('p');
  myPara.textContent = 'Location: ' + jsonObj['Location'];
  header.appendChild(myPara);
}
          
function showAttendance(jsonObj) {
  alert(number);
  var members = jsonObj['members'];
         
  for(var i = 0; i < members.length; i++) {

    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myPara4 = document.createElement('p');
    var myPara5 = document.createElement('p');
    var myPhoto = document.createElement('img');

    myH2.textContent = members[i].ID;
    myPara1.textContent = '英文姓名: ' + members[i].engName;
    myPara2.textContent = '中文姓名: ' + members[i].chtName;
    myPara3.textContent = '員工編號: ' + members[i].empID;
    myPara4.textContent = '入場編號: ' + members[i].entNumber;
    myPhoto.src = "./img/" + members[i].imgAdress;
    myPara5.textContent = ind;

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myPara4);
    myArticle.appendChild(myPhoto);
    myArticle.appendChild(myPara5); 

    section.appendChild(myArticle);                                            
  }
}      