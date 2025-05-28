let alldata = [];
let completeddata = [];
const pendingdata = [];
let namelist;

window.onload = function () {
  const storedData = localStorage.getItem('alldata');
  if (storedData) {
    alldata = JSON.parse(storedData);
  }
  alldatahandle();
};

function handleData() {
  const inputdata = document.getElementById('input-task');
  const taskdata = inputdata.value.trim();
  inputdata.value = "";

  if (taskdata === "") return;
  let idno = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  alldata = [...alldata, { data: taskdata, status: 'pending', idno : idno}];
  localStorage.setItem('alldata', JSON.stringify(alldata));
  alldatahandle();
}
function alldatahandle() {
  const alltask_list = document.getElementById('task-list');
  alltask_list.innerHTML = "";

  alldata.forEach(element => {
    const ischecked = element.status === "complete" ? "checked" : "";
    alltask_list.insertAdjacentHTML('beforeend', `
      <div class="task" data-id="${element.idno}">
        <div class="data">
          <input type="checkbox" ${ischecked} onclick="handlecheckbox(event)">
          <p>${element.data}</p>
        </div>
        <div class="ctrl">
         <span onclick="handledeletelist(event)"><i class='bx  bx-trash'></i></span>
        </div>
      </div>`);
  });
}


function handlecheckbox(event) {
  const parent = event.target.offsetParent;
  const idno = (parent.getAttribute('data-id'));

  alldata = alldata.map(element => {
    if (element.idno === idno) {
      element.status = element.status === "pending" ? "complete" : "pending";
    }
    return element;
  });

  localStorage.setItem('alldata', JSON.stringify(alldata));
  alldatahandle();
}


function handlecompletedata() {
  completeddata = alldata.filter(element => element.status === "complete");

  const alltask_list = document.getElementById('task-list');
  
    alltask_list.innerHTML = "";
    completeddata.forEach(element => {
      alltask_list.insertAdjacentHTML('beforeend', `
        <div class="task">
          <div class="data">
            <p>${element.data}</p>
          </div>
        </div>`);
    });
 
}


function handlependingdata() {
  const tempPending = alldata.filter(element => element.status !== "complete");

  const alltask_list = document.getElementById('task-list');
  alltask_list.innerHTML = "";
  tempPending.forEach(element => {
    alltask_list.insertAdjacentHTML('beforeend', `
      <div class="task">
        <div class="data">
          <p>${element.data}</p>
        </div>
        
      </div>`);
  });
}


function handleNavClick(clickedBtn, type) {
  const allButtons = document.querySelectorAll('.control-options span');
  allButtons.forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  if (type === "all") {
    alldatahandle();
  } else if (type === "complete") {
    handlecompletedata();
  } else if (type === "pending") {
    handlependingdata();
  }
}


function handleclearall() {
  alldata = [];
  localStorage.setItem('alldata', JSON.stringify(alldata));
  alldatahandle();
}

function handledeletelist(event) {

const parent = event.target.offsetParent;
const idno = (parent.getAttribute('data-id'));
alldata = alldata.filter(element => (
  element.idno != idno
))
localStorage.setItem('alldata', JSON.stringify(alldata));
  alldatahandle();
}
