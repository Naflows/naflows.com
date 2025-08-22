
let Current_goal="_3";
let GoalItem = "";
let Goal_name = "";
let activegoal;
function addDays(d, qty) {
  var dd = d.getDate();
  var mm = d.getMonth();
  var yyyy = d.getFullYear();
  return new Date(yyyy, mm, dd + qty);
}
function TimeLapse(goal) {
  let today = new Date();
  today.setHours(0,0,0,0);
  let start = new Date(goal.started_on);
  start.setHours(0,0,0,0)
  let end = new Date();
  console.log(start)
  end = addDays(start, parseInt(goal.duration))

  console.log(end)

  let timelapse = dateDiffInDays(today,end)
  


  console.log(`Timelapse is ${timelapse}`)

  return timelapse; // Amount of days including « today » and « end » before the actual end of the goal
}

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function CheckEnd(goal) {
  if (goal.words >= goal.amount_of_words) {

      return true;
  }
  if (dateDiffInDays(new Date(goal.started_on), new Date())<0) {
      return true;
  }

}


function UpdateWords(goal, words) {
  let today = new Date();
  let start = new Date(goal.started_on);

  let day = dateDiffInDays(start,today);
  
  if (!goal.updates) goal.updates={};
  if (!goal.updates[day]) {
      goal.updates[day]=0;
  }
  goal.updates[day]+=parseInt(words);

  if (!goal.updatescount) goal.updatescount=0;

  goal.updatescount++;
  goal.words+=parseInt(words);

  let ifEnd = CheckEnd(goal);

  if (ifEnd) {
      return [true, goal];
  } else {
      return [false,goal];
  }
  
}


function ShowUpOPT() {
  document.getElementById('openContainer').style.display="none";
  let s = document.getElementById('g-child-selector');
  let c = document.getElementById('child-viewer');
  document.getElementById('error-no-goal').style.visibility="hidden";
  document.getElementById('error-no-goal').style.position="absolute";

  if (s.style.visibility ==="visible") {
    s.style.visibility ="hidden";
    s.style.position="absolute";
    c.style.visibility="visible";
    c.style.position="relative";
  }
  else  {
    c.style.visibility ="hidden";
    c.style.position="absolute";
    s.style.visibility="visible";
    s.style.position="relative";
  }
}



function GoalsShowUp() {
  activegoal;
  document.getElementById('menu').style.display="none";
  document.getElementById('Main').innerHTML = `
  <div class="PJContainer">
      <div class="ChapterContainerBack" id="ChapterContainerBack">
      <svg  id="writinghoverable" onclick="OpenAll()" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M160 936V456l320-240 320 240v480H560V656H400v280H160Z"/></svg>

      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
          <p>Progress</p>
      </div>
      <div class="PJContainerDesc">
          Select a project to get started
          <p>
              Click on a project to view its goals.
          </p>
      </div>
      <div id="PJContain">

      </div>
  </div>
`;
ShowUpMiniPJ("sc")
}


function OpenProgress(el) {
  Pannel_Status=false;
  Current_goal="_3";
  InCharge = el.id;
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`))
    document.getElementById('Main').innerHTML = `
    <div class="ChapterContainerBack" id="ChapterContainerBack">
        <svg  id="writinghoverable" onclick="OpenAll()" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="M160 936V456l320-240 320 240v480H560V656H400v280H160Z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
        <p id="writinghoverable" onclick="GoalsShowUp()">Progress</p>
        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"><path d="m375 816-43-43 198-198-198-198 43-43 241 241-241 241Z"/></svg>
        <p>${InCharge}</p>
    </div>
    <div class="objglobal" id="objglobal">
      <div class="globaltop">
        <div class="globalimg">
            <div style="width:40px;height:40px;padding:5px;background-color:rgba(255,255,255,0.05);border-radius:5px;overflow:hidden;position:relative;">
            <div class="hoveritem">

            </div>
            </div>
            <div style="
              width:20px;height:20px;padding:5px;background-color:rgba(255,255,255,0.05);border-radius:5px;position:relative;
              padding: 3px;
              position:absolute;
              right:-5;
              bottom:-6;overflow:hidden;
              border-radius: 5px;background-color:rgba(255,255,255,0.05)
              ">
                <div class="hoveritem">

                </div>
              </div>

            <div id="correctpassword" style="display:none;">
              Password validated
            </div>
            </div>

          <div class="containmdp">
            <div style="
            width: 100%;
            border-radius:5px;position:relative;
            padding: 10px !important;
            background-color:rgba(255,255,255,0.05);
            height:20px;overflow:hidden;
            ">
            <div class="hoveritem">

            </div>
            </div>
          </div>
      </div>
      <div class="globalact" style="margin-top:15px;">
        <div style="width: 70px;border-radius:5px;padding: 5px !important;background-color:rgba(255,255,255,0.05);position:relative;overflow:hidden;">
        <div class="hoveritem">

        </div>
        </div>
        <div style="width: 70px;border-radius:5px;padding: 5px !important;background-color:rgba(255,255,255,0.05);position:relative;overflow:hidden;">
        <div class="hoveritem">

        </div>
        </div>
        <div style="width: 70px;border-radius:5px;padding: 5px !important;background-color:rgba(255,255,255,0.05);position:relative;overflow:hidden;">
        <div class="hoveritem">

        </div>
        </div>
      </div>
    </div>
    <div class="g-parent">
      <div class="g-c-s-container">
          <div class="goalcontainer">
            <p>Your objectives are displayed here.</p>
            <p style="color:rgba(255,255,255,0.7)">Select one to view it.<br>In order to perform any change to your objective, you will have to enter your projects password.</p>
            <div id="goalcontainer">
              
            </div> 
          </div>
      </div>
      <div id="goaldisplayer" style="display:none;">

      </div>
    </div>
    `;
    let goalNB=0;
    pj.objectives.sort(function(a,b){
      return b.started- a.started
    }); 
      for (let o of pj.objectives) {
        goalNB++;
        document.getElementById('goalcontainer').innerHTML+=`
          <div class="goalmn" id="${o.name}" onclick="ViewObjective(this)" style="opacity:${o.started==true?"1":"0.7"}">
            <div class="goalinfos">
              <div class="goalnb">
                  ${o.name}
              </div>
              <p>
                  ${o.details}
              </p>
            </div>
            <div class="editgoal" id="editgoal_${o.name}">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40"><path d="M381 821.666V330.334L626.667 576 381 821.666Z"/></svg>
            </div>
          </div>
        `;
      }
    if (goalNB<2) {
      document.getElementById('goalcontainer').innerHTML+=`
        <div class="nobj" onclick="OpenFolder({id:'pj-open-${InCharge}'})">Create ${2-goalNB} objective${2-goalNB>1?"s":""}</div>
      `;
    }
}


function IndexUpdate() {
  let UC = document.getElementById('updatesview');
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`))
  for (let o of pj.objectives) {
    if (o.name === activegoal.name) {
      for (let u of o.Updates) {
        let date = new Date(u.date);
        
        UC.innerHTML+=`
          <div class="updatelog">
            <div class="del">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>

            </div>
            <div class="updatenumber">
              ${u.number}              
            </div>
            <div class="updatedetails">
              <div class="updatefeeling">
                ${u.feeling} session
              </div>
              <div class="updatewords">
                ${u.words} words
              </div>
              <div class="updatedate">
                ${date.getDate()>9?date.getDate():"0"+date.getDate()}/${date.getMonth()+1>9?date.getMonth()+1:"0"+(date.getMonth()+1)}/${date.getFullYear()}
              </div>
            </div>
          </div>
          
        `;
      }
    }
  }
}

function CheckOBJPassword(el) {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
  if (el.value === pj.password) {
    document.getElementById("objname").readOnly = false;
    document.getElementById("objdesc").readOnly = false;
    document.getElementById("objnb").readOnly = false;
    document.getElementById("objd").readOnly = false;
    const Animate = [
      { transform: "scale(1)", fill:"green" },
      { transform: "scale(1.2)", fill:"green" },
      { transform: "scale(1)", fill:"green" },
    ];
    
    const AnimateT = {
      duration: 750,
      iterations: 1,
    };
    document.getElementById('PLOCK').animate(Animate,AnimateT);
    document.getElementById('PLOCK').innerHTML = `
      <path d="M220 422h390v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326h-60q0-79 55.606-134.5t134.5-55.5Q559 136 614.5 191.575T670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422Zm0 494h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM220 916V482v434Z"/>
    `;

    return true;
  } else {
    document.getElementById("objname").readOnly = true;
    document.getElementById("objdesc").readOnly = true;
    document.getElementById("objnb").readOnly = true;
    document.getElementById("objd").readOnly = true;
    const Animate = [
      { transform: "scale(1)", fill:"red" },
      { transform: "scale(1.2)", fill:"red" },
      { transform: "scale(1)", fill:"red" },
    ];
    
    const AnimateT = {
      duration: 750,
      iterations: 1,
    };
    document.getElementById('PLOCK').animate(Animate,AnimateT);

    document.getElementById('PLOCK').innerHTML = `
    <path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z"/>
    `;

  }
}


function ViewObjective(el) {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`))
  let goal;
  for (let o of pj.objectives) {
    console.log(o)
    if (o.name === el.id) {
      goal = o;
    }
  }

  
  
  document.getElementById("editgoal_"+el.id).style.display="none";
  document.getElementById(el.id).innerHTML+=`<div class="opened">Viewing</div>`
  activegoal=goal;
  document.getElementById('objglobal').innerHTML=`
  <div class="globaltop">
    <div class="globalimg">
      <img src="${pj.cover?pj.cover:"Images & Icons/Sprint+ blank.png"}">
        <svg xmlns="http://www.w3.org/2000/svg" height="25" id="PLOCK" viewBox="0 96 960 960" width="25" fill="white"><path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z"/></svg>
        <div id="correctpassword" style="display:none;">
          Password validated
        </div>
        </div>

      <div class="containmdp">
        <input type="password" placeholder="Project password" id="objpassword" oninput="CheckOBJPassword(this)">
      </div>
    </div>
    <div class="globalact">
      <button>
          ${goal.started?"Stop":"Start"}
      </button>
      <button>
          Delete
      </button>
      <button>
          Download
      </button>
    </div>
    <div class="objadv">
    <div class="adv">
      <p>Ends in</p>
      <div class="advi">
        ${TimeLapse(goal)} days
      </div>
    </div>
    <div class="adv">
      <p>Words left</p>
      <div class="advi" id="adviwords">
        <div class="firework" id="fireworkwords" style="display:none"></div>
        ${goal.amount_of_words-goal.words} words
      </div>
    </div>
    <div class="adv">
      <p>Status</p>
      <div class="advi">
        ${goal.started?"Running":(goal.archived ? "Archived":"Sleeping")}
      </div>
    </div>
  </div>
  `;
  document.getElementById('goaldisplayer').style.display="flex";
    document.getElementById('goaldisplayer').innerHTML=`
      <div class="objectiveviewer">
          <div class="objectiveinformations">
            <div class="objectivenameanddesc">
              <div class="underobj">
                <p>Name</p>
                <input type="text" id="objname" value="${goal.name}" readonly>
              </div>
              <div class="underobj">
                <p>Description</p>
                <textarea id="objdesc" readonly>${goal.details}</textarea>
              </div>
            </div>
            <div class="objectivenb">
                <div class="underobj">
                  <p>Words target</p>
                  <input type="number" id="objnb" value="${goal.amount_of_words}" readonly>
                </div>
                <div class="underobj">
                  <p>Objective duration</p>
                  <input type="number" id="objd" value="${goal.duration}" readonly>
                </div>
              </div>
          </div>
          <div id="updatecontaineractive">

          </div>
      </div>
      <div class="objectiveview">
        <div class="updatesview">
          <p>Manage your objective updates</p>
          <div id="updatesview">

          </div>
        </div>
        <div class="displaycanva">
          <div id="canvacurve" style="position:relative;">

          </div>
        </div>
      </div>
    `;
    GoalUpdate()

    DrawCanva(goal,10);
    IndexUpdate();
}

function CheckInfoGoalUpdate() {
  let goal = activegoal;
  let toadd = parseInt(document.getElementById('wordsvalue').value);
  let status;
  if (goal.words + toadd >= parseInt(goal.amount_of_words)) {
    status = "You're finishing your goal!"
  } else if (goal.words + toadd > goal.words) {
    let prc = Math.round(((goal.words + toadd)*100)/parseInt(goal.amount_of_words));
    status = `You're going up to ${prc}% of your goal!`;
  } else if (goal.wrods + toadd < goal.words) {
    status = `Oh no! We're sad to see you're deleting your words :(`
  } else {
    status = "Whatcha doin'?"
  }

  document.getElementById('containinfos').innerHTML = status;
}



let emoji;
function AddEmoji(el) {
  let f = document.getElementsByClassName('feeling');
  for (let i of f) {
    if (i.id === el.id) {
      i.style.borderColor = "white";
      emoji = el.id;
    } else {
      i.style.borderColor = "rgba(0,0,0,0)";
    }
  }
}


function GoalUpdateAdd() {
  let nbwords = parseInt(document.getElementById('wordsvalue').value);
  if (nbwords>0 && emoji) {
      GoalUpdate();
      IndexUpdate()
      let goal = activegoal;
      let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
      for (let g of pj.objectives) {
        if (g.name == goal.name) {
          g.words+=nbwords;
          if (!g.Updates) {
            g.Updates = [];
          }
          let today = new Date();
          today.setHours(0,0,0,0);
          g.Updates.push({
            number : g.Updates.length+1,
            words : nbwords,
            feeling : emoji,
            date : today
          });
          localStorage.setItem(`Project : ${InCharge}`,JSON.stringify(pj));
            document.getElementById('fireworkwords').style.display="flex";
            const Firework = [
              { 
                transform: "translate(var(--x), var(--initialY))",width: "var(--initialSize)",opacity: "1"
               },
              { 
                opacity: '1'
               },
               {
                width: 'var(--finalSize)', opacity: '0'
               }
          
            ];
            
            const FireworkT = {
              duration: 1000,
              iterations: 1,
            };
            document.getElementById('fireworkwords').animate(Firework, FireworkT);
            setTimeout(() => {
              document.getElementById('adviwords').innerHTML = `
              <div class="firework" id="fireworkwords" style="display:none"></div>
              ${parseInt(g.amount_of_words)-g.words} words
            `;
            }, FireworkT.duration);

          return;
        }
      }


  }

}


function GoalUpdate() {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
  setTimeout(() => {
    console.log(document.getElementById('updatecontaineractive'))
    if (!activegoal.Updates) {
      activegoal.Updates = [];
    }
    document.getElementById('updatecontaineractive').innerHTML=`
      <div class="update" id="update">
        <div class="updatetitle">
            Update ${activegoal.name}
            <p>Update N°${activegoal.Updates.length+1}</p>
        </div>
        <div class="updatecontainer">
            <div class="inputcontainer">
              <div class="i">
                  <p>Words*</p>
                  <div class="inputcontainernb">
                    <input type="number" id="wordsvalue" placeholder="Enter a valid number here" oninput="CheckInfoGoalUpdate()">
                    <div id="containinfos">

                    </div>
                  </div>
              </div>
              <div class="i">
                <p>Feeling*</p>
                <div class="feelingcontent">
                  <div class="feeling" id="Happy" onclick="AddEmoji(this)">
                    <svg id="Happysvg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M626 523q22.5 0 38.25-15.75T680 469q0-22.5-15.75-38.25T626 415q-22.5 0-38.25 15.75T572 469q0 22.5 15.75 38.25T626 523Zm-292 0q22.5 0 38.25-15.75T388 469q0-22.5-15.75-38.25T334 415q-22.5 0-38.25 15.75T280 469q0 22.5 15.75 38.25T334 523Zm146 272q66 0 121.5-35.5T682 663h-52q-23 40-63 61.5T480.5 746q-46.5 0-87-21T331 663h-53q26 61 81 96.5T480 795Zm0 181q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm0-400Zm0 340q142.375 0 241.188-98.812Q820 718.375 820 576t-98.812-241.188Q622.375 236 480 236t-241.188 98.812Q140 433.625 140 576t98.812 241.188Q337.625 916 480 916Z"/></svg>
                    <p>Happy</p>
                  </div>
                  <div class="feeling" id="Sad" onclick="AddEmoji(this)">
                    <svg id="Sadsvg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M626 523q22.5 0 38.25-15.75T680 469q0-22.5-15.75-38.25T626 415q-22.5 0-38.25 15.75T572 469q0 22.5 15.75 38.25T626 523Zm-292 0q22.5 0 38.25-15.75T388 469q0-22.5-15.75-38.25T334 415q-22.5 0-38.25 15.75T280 469q0 22.5 15.75 38.25T334 523Zm146.174 116Q413 639 358.5 676.5T278 776h53q22-42 62.173-65t87.5-23Q528 688 567.5 711.5T630 776h52q-25-63-79.826-100-54.826-37-122-37ZM480 976q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm0-400Zm0 340q142.375 0 241.188-98.812Q820 718.375 820 576t-98.812-241.188Q622.375 236 480 236t-241.188 98.812Q140 433.625 140 576t98.812 241.188Q337.625 916 480 916Z"/></svg>
                    <p>Sad</p>
                  </div>
                  <div class="feeling" id="Productive" onclick="AddEmoji(this)">
                    <svg id="Productivesvg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="m887 489-23-50-50-23 50-23 23-50 23 50 50 23-50 23-23 50ZM760 314l-35-74-74-35 74-35 35-74 35 74 74 35-74 35-35 74ZM360 976q-34 0-57.5-23.5T279 895h162q0 34-23.5 57.5T360 976ZM198 833v-60h324v60H198Zm5-121q-66-43-104.5-107.5T60 459q0-122 89-211t211-89q122 0 211 89t89 211q0 81-38 145.5T517 712H203Zm22-60h271q48-32 76-83t28-110q0-99-70.5-169.5T360 219q-99 0-169.5 70.5T120 459q0 59 28 110t77 83Zm135 0Z"/></svg>
                    <p>Productive</p>
                  </div>
                  <div class="feeling" id="Neutral" onclick="AddEmoji(this)">
                    <svg id="Neutralsvg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M626 523q22.5 0 38.25-15.75T680 469q0-22.5-15.75-38.25T626 415q-22.5 0-38.25 15.75T572 469q0 22.5 15.75 38.25T626 523Zm-292 0q22.5 0 38.25-15.75T388 469q0-22.5-15.75-38.25T334 415q-22.5 0-38.25 15.75T280 469q0 22.5 15.75 38.25T334 523Zm20 194h253v-49H354v49Zm126 259q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm0-400Zm0 340q142.375 0 241.188-98.812Q820 718.375 820 576t-98.812-241.188Q622.375 236 480 236t-241.188 98.812Q140 433.625 140 576t98.812 241.188Q337.625 916 480 916Z"/></svg>
                    <p>Neutral</p>
                  </div>
                  <div class="feeling" id="Frustrated" onclick="AddEmoji(this)">
                    <svg id="Frustratedsvg" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M391 816q17 0 32.5-6t30.5-14q6-4 12.5-7t13.5-3q8 0 26 10 15 8 30.5 14t32.5 6q50 0 80.5-35.5T680 686q0-72-49.5-111T488 536h-16q-93 0-142.5 39T280 686q0 59 30.5 94.5T391 816Zm-1-60q-24 0-37.5-18.5T339 686q0-46 32.5-68T472 596h15q68 0 100 22t32 68q0 33-13 51.5T569 756q-12 0-34-12-13-8-26.5-13t-28.5-5q-15 0-29 5t-27 13q-8 5-16.5 8.5T390 756ZM251 524q60-24 96-53t68-79l-50-32q-26 41-54.5 63T228 468l23 56Zm457 0 23-56q-53-22-81-44t-55-64l-50 32q32 50 68 78.5t95 53.5ZM480 976q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm0-400Zm0 340q142.375 0 241.188-98.812Q820 718.375 820 576t-98.812-241.188Q622.375 236 480 236t-241.188 98.812Q140 433.625 140 576t98.812 241.188Q337.625 916 480 916Z"/></svg>
                    <p>Frustrated</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="updategoalbutton" onclick="GoalUpdateAdd()">
        <div class="favouriteitem2"></div>
      <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M378 810 154 586l43-43 181 181 384-384 43 43-427 427Z"/></svg>

    </div>
      </div>
    
    `;
  }, 20);
}

function DrawCanva(g) {
  let d = g.duration;
  let canva = document.getElementById('canvacurve');
  let XGap = 45;
  let YGap = 20;
  let yl = YGap;
  let xl = XGap;
  for (let i = 0; i < 5; i++) {
    canva.innerHTML+= `
        <ybar style="
          width : ${canva.offsetWidth-XGap-10}px;
          height:2px;
          bottom:${yl}px;
          left:${XGap}px;
          background-color:white;
          display:flex;
          position:absolute;
        ">

        </ybar>
    `;
    canva.innerHTML+= `
        <yi style="
          bottom:${yl-7.5}px;
          left:5px;
          display:flex;
          position:absolute;
        ">
          ${Math.round((parseInt(g.amount_of_words)/4)*i/1000)}K
        </yi>
    `;
    yl += 60;
  }
  let length = canva.offsetWidth-XGap-10;
  let L = length/(Math.round(parseInt(g.duration)));
  for (let i = 0; i < parseInt(g.duration)+1;i++ ) {
    canva.innerHTML+= `
        <updatepoint style="
          bottom:${YGap-2};
          left:${XGap + L*i}px;
          display:flex;
          position:absolute;
          width:5px;
          border-radius:5px;
          height:5px;
          background-color:white
        ">
        </updatepoint>
    `;
  }
  let UpdatesValor = {};
  for (let i = 1; i < parseInt(g.duration)+1;i++) {
    UpdatesValor[i]=0;
  }
  for (let i = 0; i < g.Updates.length; i++) {
    let start = new Date(g.started_on);
    let updtd = new Date(g.Updates[i].date);
    let diff = dateDiffInDays(start,updtd);
    UpdatesValor[diff+1] +=g.Updates[i].words;
  }
  let start = new Date(g.started_on);
  let today = new Date();
  today.setHours(0,0,0,0)
  let diff = dateDiffInDays(start,today);
  console.log(diff + " days done");
  console.log(UpdatesValor)
  let words = 0;
  for (i=1;i < parseInt(g.duration)+1; i++) {
    let day;
    if (i<=diff+1) {
      day = ((canva.offsetWidth-XGap)/parseInt(g.duration))*(i-1);
      let top = canva.offsetHeight-YGap*2-10;
      words+=UpdatesValor[i];
      console.log(words + " words")
      canva.innerHTML+= `
      <div id="updatepoint" style="
        bottom:${YGap+(top*words)/parseInt(g.amount_of_words)}px;
        left:${XGap + day-2.5}px;
        display:flex;
        position:absolute;
        width:10px;
        border-radius:5px;
        cursor:pointer;
        height:10px;
        background-color:var(--main-colorful)
      ">
      </div>
      <div id="updatepointb" style="
        position:absolute;display:none;flex-direction:column;
        bottom:${YGap+15+(top*words)/parseInt(g.amount_of_words)}px;
        left:${XGap + day - 72.5}px;
        justify-content:center;gap:0px;width:150px;align-items:center;
        background-color:var(--main-blue-dark);
        border-radius:5px;
        padding-top:5px
      ">
        <p>${words} words - Day ${i}</p>
        <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 96 960 960" width="15" fill="white"><path d="M480 696 280 497h400L480 696Z"/></svg>
      </div>
    `;
    } 
  }
  
  function TraceCanvaNormal() {
    /*AC*/ let xaxis = document.getElementById('xaxis').offsetWidth-10;
    /*AB*/ let yaxis = document.getElementById('yaxis').offsetHeight-10;
    console.log(xaxis + " is xaxis")
    /* Pythagorus theorem */
    /*CB*/ let PY = Math.sqrt(yaxis**2+xaxis**2);
    console.log(xaxis,yaxis)
    /*Angle of ABC (cos)*/
    let B = Math.atan(xaxis/yaxis) * 180 / Math.PI;
    let ABC =180-90-B;
    console.log(B + " is B");

    canva.innerHTML+=`
      <progressbar style="transform-origin: bottom left;transform:rotate(${-ABC}deg);border-radius:5px;
        position:absolute;bottom:0;left:10;z-index:60;width:${PY}px;height:2px;background-image:linear-gradient(to right,#75abbc,#12ef);">
      </progressbar>
    `;


    for (let i = 0 ; i<r_word+1; i++) {
      canva.innerHTML+=`
      <axy style="bottom:${i*25};left:-1;z-index:50;height:2px; width:${xl+20}px;background-color:rgba(255,255,255,0.05);animation:unset !important;"></axy>
      `;

    } 
    for (let i = 0 ; i<r_word+1; i++) {
      canva.innerHTML+=`
      <axx style="left:${9+i*25};bottom:0;z-index:50;width:2px; height:${yl}px;background-color:rgba(255,255,255,0.05);transform:rotate(180deg);animation:unset !important;"></axx>
      `;
    } 
    let words = Math.round(parseInt(g.amount_of_words)/parseInt(r_word));
    for (let i = 0 ; i<r_word+1; i++) {
        canva.innerHTML+=`
        <axx id="pointerviewer" style="left:${9+i*25-1.5};bottom:${i*25-1.5};z-index:71;width:5px;border-radius:50%;cursor:pointer; height:5px;background-color:white;transform:rotate(180deg);animation:unset !important;">
        </axx>
        <div class="pointerviewerv" style="left:${18+i*25-1.5};bottom:${i*25-9};background-color:var(--main-blue-dark);border-radius:5px;flex-direction:row;gap:0px;z-index:72;position:absolute;width:fit-content;padding-right:5px;;transform:rotate(0deg);font-size:13px;font-weight:normal;">
          <svg xmlns="http://www.w3.org/2000/svg"  fill="white" height="20" viewBox="0 96 960 960" width="20"><path d="M560 776 360 576l200-200v400Z"/></svg>
          <p style="white-space:nowrap;">Day ${Math.round(d*i/r_word)} - ${words*i} words</p>
        </div>
        `;
    } 

  }
  function TraceUPDTCurve() {
    let updates = g.Updates;
    let gu = [];
    let w = 0;
    for (let i=0;i<parseInt(g.duration);g++ ) {
      gu.push({words:0,day:i+1})
      for (let u of updates) {
        let date = new Date(u.date);

        let date2 = new Date(g.started_on);
        const diffTime = Math.abs(date2 - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        gu[diffDays].words+=u.words;
        w+=u.words;
      }
    }
    let yaxis = document.getElementById('yaxis').offsetHeight-10;
    
    console.log(gu,w);
    
  }

}



function ManageGoals() {
  GoalsShowUp();
  document.getElementById('select-pj-goal').value =  starringPJ.name;
  document.getElementById('select-pj-goal').onchange();
  starringPJ;
}


function EditGoal() {
  let g = JSON.parse(localStorage.getItem(document.getElementsByClassName('DelToActualize').id));
  if (g) {
      document.getElementById('g-c-s-management').innerHTML=`
      <div class="editGoalContent">
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            edit_note
            </span>
            Name
          </div>
          <div class="EGC-c-d">
            Change the name of your goal
          </div>
          <div class="EGC-c-c">
            <input type="text" id="goalName">
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            description
            </span>
            Description
          </div>
          <div class="EGC-c-d">
            Describe your goal with some words
          </div>
          <div class="EGC-c-c">
            <textarea  id="goalDesc"></textarea>
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            timer
            </span>
            Duration
          </div>
          <div class="EGC-c-d" id="GoalEndInHowMuchDays">
            In how much days will your goal end? 
          </div>
          <div class="EGC-c-c">
            <input type="number" id="goalDays" min="0">
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            text_snippet
            </span>
            Words objective
          </div>
          <div class="EGC-c-d">
            How much words do you want to write? You already wrote ${g.words} words
          </div>
          <div class="EGC-c-c">
            <input type="number" id="goalWords" min="${g.words}">
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            text_snippet
            </span>
            Current amount of words
          </div>
          <div class="EGC-c-d">
            This shows how much words you've already written
          </div>
          <div class="EGC-c-c"  id="CantModifyContent">
            <input type="number" id="currentamount" readonly="true">
          </div>
        </div>
        <div class="EGC-c">
          <div class="EGC-c-t">
            <span class="material-symbols-outlined">
            calendar_month
            </span>
            Started on
          </div>
          <div class="EGC-c-d">
            THis shows when your goal started.
          </div>
          <div class="EGC-c-c"  id="CantModifyContent">
            <input type="text" id="StartedOn" readonly="true">
          </div>
        </div>
        <button id="SaveGoalButton"> 
          Save goal
        </button>
        <div id="errorGoalSave" style="background-color:red;position:absolute;visibility:hidden">
          An error occured. Check for your content.
        </div>
      </div>
    `;
    document.getElementById('goalName').value=g.name;
    document.getElementById('goalDesc').value=g.details;
    document.getElementById('goalWords').value=parseInt(g.amount_of_words);
    document.getElementById('currentamount').value=g.words;

    let Start = new Date(g.started_on);  
    let Time = parseInt(g.duration)
    let Today = new Date();
    Today.setHours(0,0,0,0)
    let TD = 0;
    let ClockSet = false;
    console.log('TIME IS ' + Time)
    for (let i = 1; i < Time+1; i++) {
      let d =Start.getTime() + 86400000*i;
      d = new Date(d);
      console.log(`${d.getDate()}/${d.getMonth()+1}`)
      d.setHours(0,0,0,0)
      if (
        ClockSet != true && d.getDate() === Today.getDate() && 
        d.getMonth() === Today.getMonth() && 
        d.getFullYear() === Today.getFullYear() 
        )  {

          TD = i;
          ClockSet = true;
        }
    }

    Start.setDate(Start.getDate()+Time-TD)
    Start = new Date(Start)
    document.getElementById('GoalEndInHowMuchDays').innerHTML=`
      Your goal will end on ${
        Start.getDate()>9?Start.getDate():'0'+Start.getDate()
      }/${Start.getMonth()+1>9?Start.getMonth()+1:'0'+(Start.getMonth()+1)}/${Start.getFullYear()},
      which means in ${Time-TD} days
  
    `;
    document.getElementById('goalDays').value=parseInt(g.duration);
    document.getElementById('goalDays').onchange = function() {
        let Start = new Date(g.started_on);  
        let Time = parseInt(document.getElementById('goalDays').value);
        Start.setDate(Start.getDate()+Time-TD)
        Start = new Date(Start)
        document.getElementById('GoalEndInHowMuchDays').innerHTML=`
        Your goal will end on ${
          Start.getDate()>9?Start.getDate():'0'+Start.getDate()
        }/${Start.getMonth()+1>9?Start.getMonth()+1:'0'+(Start.getMonth()+1)}/${Start.getFullYear()},
        which means in ${TimeLapse(g)} days
    
      `;
    }



    let startedOn = new Date(g.started_on);
    document.getElementById('StartedOn').value=`${
      startedOn.getDate()>9?startedOn.getDate():'0'+startedOn.getDate()
    }/${startedOn.getMonth()+1>9?startedOn.getMonth()+1:'0'+(startedOn.getMonth()+1)}/${startedOn.getFullYear()}

    `
    ;

    document.getElementById('SaveGoalButton').onclick = function() {
      console.log(document.getElementById('goalName').length)
      console.log(document.getElementById('goalDesc').value)
      console.log(document.getElementById('goalWords').value)

      if (
        document.getElementById('goalName').value.length>0 &&
        document.getElementById('goalDesc').value &&
        document.getElementById('goalWords').value>=g.words
      ) {
        g.amount_of_words = document.getElementById('goalWords').value;
        g.name = document.getElementById('goalName').value;
        g.details = document.getElementById('goalDesc').value;
        g.duration = parseInt(document.getElementById('goalDays').value);
        localStorage.setItem(document.getElementsByClassName('DelToActualize').id,JSON.stringify(g));
        Current_goal="_3";
        GoalItem = "";
        Goal_name = "";
        GoalsShowUp();
      }
    }
  }
  else {
    document.getElementById('errorGoalSave').style.visibility = 'visible';
    document.getElementById('errorGoalSave').style.position = 'relative';

  }
}




function StopGoal() {
  let g = JSON.parse(localStorage.getItem(document.getElementsByClassName('DelToActualize').id));
  if (g) {
      g.started = false;
      localStorage.setItem(document.getElementsByClassName('DelToActualize').id,JSON.stringify(g))
      GoalsShowUp();
      document.getElementsByClassName('DelToActualize').id = '';

  } else {
    document.getElementById('error-no-goal').style.visibility = 'visible';

  }
}




function DelGoalStats() {
  if (localStorage.getItem(document.getElementsByClassName('DelToActualize').id)) {
      document.getElementById('g-c-s-management').innerHTML = `
        <div class="confirmPassword">
          Confirm your action with the password of your project:
          <input type="password" id="passwordProject">
          <button onclick="ConfirmGoalDel()">
              Confirm
          </button>
        </div>
      `;

  } else {
    document.getElementById('error-no-goal').style.visibility = 'visible';
  }
}

function ConfirmGoalDel() {
  let pj = JSON.parse(localStorage.getItem(`Project : ${InCharge}`))
  if (pj) {
    if (document.getElementById('passwordProject').value==pj.password) {
      localStorage.removeItem(document.getElementsByClassName('DelToActualize').id);
      document.getElementsByClassName('DelToActualize').id = '';
    }
  } 
  Current_goal="_3";
  GoalItem = "";
  Goal_name = "";
  GoalsShowUp();
}
function DownloadCanvas() {
  let canvas = document.getElementById('pjcurve');
  document.getElementById('error-no-goal').style.visibility = 'hidden';
  var image = canvas.toDataURL();
  // Create a link
  var aDownloadLink = document.createElement('a');
  // Add the name of the file to the link
  aDownloadLink.download = 'SPRINT+ progress curve.png';
  // Attach the data to the link
  aDownloadLink.href = image;
  // Get the code to click the download link
  aDownloadLink.click();
}


function FixGoal(el) {
  document.getElementById('error-no-goal').style.visibility = 'hidden';
  console.log(Current_goal, el.id)
    if (Current_goal!=el.id) {
        document.getElementById(el.id).style.borderColor = "rgba(255, 255, 255, 0.3)";
        Current_goal = el.id;
        GoalItem = parseInt(el.id.replace("_",""))-1;
        document.getElementsByClassName('DelToActualize').id = `${InCharge}-goal-${parseInt(el.id.replace('_',''))-1}`;
        console.log('SETID ' + document.getElementsByClassName('DelToActualize').id)
    } else {
        Current_goal="_3";
        document.getElementById(el.id).style.borderColor = "";
        document.getElementsByClassName('DelToActualize').id = '';
        console.log('UNSETID')
        GoalItem = 0;
    }
    document.getElementById(el.id === "_1" ? "_2" : "_1").style.borderColor = "";

}

function GoalSelect() {
    let el = document.getElementById('select-pj-goal');
    var text = el.options[el.selectedIndex].text;
    console.log(el.selectedIndex, el.options[el.selectedIndex].text)

    let pj = JSON.parse(localStorage.getItem(`Project : ${text}`));
    InCharge = pj.name;


    document.getElementById('g-c').innerHTML="";

    for (let i=0;i<2;i++) {
        let g = JSON.parse(localStorage.getItem(`${pj.name}-goal-${i}`));
        if (g && g.started) {
            document.getElementById('g-c').innerHTML+=`
                <div id="_${i+1}" onclick="FixGoal(this)">
                <span class="material-symbols-outlined">
                    school
                    </span>
                    <p> ${g.name} </p>
                </div>
            `;
        } else {
            document.getElementById('g-c').innerHTML+=`
                <div id="_${i+1}" onclick="OpenFolder({id:'pj-open-${InCharge}'})">
                <span class="material-symbols-outlined" >
                    empty_dashboard
                    </span>
                   <p> Manage goals </p>
                </div>
            `;
        }
    } 


}



function GetWidth(a) {
  var w = window.innerWidth;
  w = (w*390)/525;
  return (a*w)/980;
}
function GetHeight(a) {
  var w = window.innerWidth;
  w = (w*390)/525;
  h= (w*500)/980;
  return (h*a)/500 ;
}

function DrawCurve() {
  document.getElementById('child-viewer').innerHTML=`<canvas id="pjcurve" width="980" height="500" style="background-color: rgba(26,41,80,0.3);"></canvas> `;
  var w = window.innerWidth;
  var canvas = document.getElementById('pjcurve');
  w = (w*390)/525;
  if (w>=320 && w<=420) {
    var h = (w*500)/980;
    canvas.width  = w;
    canvas.height = h;
  } else {
    canvas.width  = 980;
    canvas.height = 500;
  }
  if (  document.getElementById('update_empty')) {
    document.getElementById('update_empty').innerHTML = "";
  }
  ShowUpOPT()

    let goal = JSON.parse(localStorage.getItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`));
    if (!goal) {
      document.getElementById('error-no-goal').style.visibility = 'visible';
      return;
    }
    let daysUntil = parseInt(goal.duration);
    let MaxWords = parseInt(goal.amount_of_words);
    let updates = goal.updates;

    var canvas = document.getElementById("pjcurve");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#CDE";
    
    ctx.fillRect(GetWidth(100), GetHeight(390), GetWidth(700), 2);
    ctx.fillRect(GetWidth(100), GetHeight(80), 2, GetHeight(310));

    ctx.font = "15px serif";
    ctx.fillText("Words (K)", GetWidth(80), GetHeight(70));
    ctx.fillText("Time (D)", GetWidth(790), GetHeight(380));


    for (let i = 0; i < 11;i+=(daysUntil/(daysUntil/10))/10) {
      console.log(i*(daysUntil/10))
        ctx.fillText(Math.floor(i*(daysUntil/10)),GetWidth(97+i*60), GetHeight(415+(500-canvas.height)/8));
        ctx.fillRect(GetWidth(100+i*60), GetHeight(390), 2, 8);
    }
    for (let i = 0; i < 11; i+=1) {
        ctx.fillText(Math.floor((i*((MaxWords/10)/1000))),GetWidth(((canvas.width*76)/980)), GetHeight(395+i*-30));
        ctx.fillRect(GetWidth(92), GetHeight(90+i*30), 8, 2);
    }
    function DrawCircle(ctx, x,y) {
      ctx.beginPath();
      ctx.arc(x+1, y+1, 2, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    }



    let lastx = GetWidth(100);
    let lasty = GetHeight(390);
    for (let update of Object.keys(updates)) {
      console.log(updates[update])
      let x = GetWidth(100) + (update*GetWidth(50))/(daysUntil/10);
      let y = GetHeight(390) - ((updates[update]/1000)*GetHeight(29.5))/((MaxWords/10)/1000);


      ctx.beginPath();
      ctx.strokeStyle = '#CDE';
      ctx.lineWidth = 0.5;
      ctx.quadraticCurveTo(lastx+1,lasty+1,x+1,y+1);
      ctx.stroke();

      DrawCircle(ctx, x,y);

      lastx = x;
      lasty = y;

      
    }
    ctx.fillStyle = '#CDE';
    ctx.fillText(`Sprint+ Generated`,GetWidth(10), GetHeight(490));
    //ctx.fillText(`A tool made by https://www.instagram.com/naf_author/`,GetWidth(625), GetHeight(490));
    //ctx.font = "25px serif"
    //ctx.fillText(`${goal.name}: write ${MaxWords} words in ${daysUntil} days`, GetWidth(300), GetHeight(50));

}





function ChangeGoalFeedback(el) {
    let project = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    for (let i = 0 ; i < project.archived_goals.length;i++) {
      if (project.archived_goals[i].name === el.id) {
        project.archived_goals[i].feedback = document.getElementById('feedbackarea').value;
        localStorage.setItem(`Project : ${InCharge}`,JSON.stringify(project));
        return;
      }
    }
}
function OpenStats(y=false) {
  let project = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
  let goal;
  if (y===false) {
    goal = JSON.parse(localStorage.getItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`));
  } else {
    for (let G of project.archived_goals) {
      if (G.name === y.id) {
        goal= G;
        document.getElementById('Main').innerHTML = `
        <div class="g-parent">
          <div class="child-viewer" id="child-viewer">
          </div>
        </div>`
      }
    }
  }
  if (  document.getElementById('update_empty') && y===false) {
    document.getElementById('update_empty').innerHTML = ""

  }
  if (!goal && y === false) {
    document.getElementById('error-no-goal').style.visibility = 'visible';
    return;
  }
  if (y===false) {
    ShowUpOPT()
  }
  let Time = parseInt(goal.duration);
  let Start = new Date(goal.started_on);
  let Ends = new Date(Start.getTime()+86400000*Time);
  Start.setHours(0,0,0,0);
  Ends.setHours(0,0,0,0);



  let Today = new Date();
  Today.setHours(0,0,0,0);
  let td = new Date();
  td.setHours(0,0,0,0);
  let ClockSet = false;
  for (let i = 0; i < Time; i++) {
    let d =Start.getTime() + 86400000*i;
    d = new Date(d);
    d.setHours(0,0,0,0)
    if (
      ClockSet != true && d.getDate() === Today.getDate() && 
      d.getMonth() === Today.getMonth() && 
      d.getFullYear() === Today.getFullYear() 
      )  {
        Today = i;
        ClockSet = true;
      }
  }

  let MaxWords = parseInt(goal.amount_of_words);
  let Words = goal.words;
  // Amount of words missing to finish the goal:
  let NeededWords = MaxWords - Words;
  console.log(NeededWords + " words")

  // How much day till the end of the goal:
  let TimeUntil = TimeLapse(goal);
  console.log(TimeUntil)

  // How much words for today:
  let WordsForToday = Math.round(NeededWords/TimeUntil);

  let WordsWritten = [];
  let StrikedBefore = 0;
  let StrikeCount = 0;

  for (let [key,value] of Object.entries(goal.updates)) {
      WordsWritten.push(parseInt(value));
      if (key-1!=StrikedBefore) {
        StrikeCount=0;
      }
      StrikeCount++;
      StrikedBefore=key;
  }
  
  if(!WordsWritten[goal.duration-TimeUntil]) {
    WordsWritten[goal.duration-TimeUntil]=0;
  }

  

  let ProgressToday = Math.round((WordsWritten[goal.duration-TimeUntil]*100)/WordsForToday);
  let ProgressOverall = Math.round((Words*100)/MaxWords);




  if (y===false) document.getElementById('openContainer').style.display="flex";

  if (goal.finished && y==false) {
    let project = JSON.parse(localStorage.getItem(`Project : ${InCharge}`));
    if (!project.archived_goals) {
      project.archived_goals = [];
    }
    goal.finished_on = new Date();
    goal.finished_on.setHours(0,0,0,0)
    project.archived_goals.push(goal);
    localStorage.removeItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`);
    localStorage.setItem(`Project : ${InCharge}`,JSON.stringify(project));
  }
  document.getElementById('child-viewer').innerHTML=`
    <div class="c-v-c">
      <div class="c-v-c-t">
      <p onclick="OpenFolder({id:'pj-open-${InCharge}'})">
        ${InCharge} 
      </p>
      
      <span class="material-symbols-outlined">
      navigate_next
      </span>
      ${goal.name}
      </div>
      <div class="finishedgoal" style="display:${goal.finished?"inline":"none"}">
        <div class="finishedcongratulation">
            <div class="finishedtitle">
                Congratulations, ${JSON.parse(localStorage.getItem('user')).name}!<br>
                You did it! You wrote ${goal.words} words in ${goal.duration} days!<br>
                <p>
                  What an advancement. What will you do next?<br>
                  Publish what you write? Start new objectives?<br>
                  We hope the best for you!
                </p><br>
                <div class="textareafeedback" id="${goal.name}" oninput="ChangeGoalFeedback(this)">
                  <textarea id="feedbackarea" placeholder="My experience during this goal">${goal.feedback?goal.feedback:""}</textarea>
                </div>
            </div>
            <div class="finisheddesc">
                This goal is officialy finished. It is archived in your project 
                files, and you will not be able to update it anymore. It will be stopped,
                and won't be reseted.
            </div>
        </div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <div class="firework"></div>
        <img src="Images & Icons/party.png">

      </div>
      <div class="contain_infos">
      <div class="c-v-c-mt">
        Progress
      </div>
        <div class="c-v-content-stats" id="c-v-content-stats">
          <div class="c-v-c-s">
            <div class="c-v-c-s-t">
              <span class="material-symbols-outlined">
              calendar_today
              </span>
              Today progress
            </div>
            <div class="bar" id="todaybar">
              <div class="bar-hover" id="bartoday"></div>
              <div class="contentinfostats" id="contentinfostatstoday">
                ${goal.finished?"":(ProgressToday > 100 ? "100%+":ProgressToday+"%")}
              </div>
              <div class="contentinfostatshidden" id="contentinfostatshiddentoday">
              ${goal.finished?"":(WordsWritten[goal.duration-TimeUntil]+" / "+WordsForToday + "words")} 
              </div>
            </div>

          </div>
          <div class="c-v-c-s">
              <div class="c-v-c-s-t">
              <span class="material-symbols-outlined">
              clock_loader_60
              </span>
              Overall progress
            </div>
            <div class="bar" id="wholebar">
              <div class="bar-hover" id="barwhole"></div>
              <div class="contentinfostats" id="contentinfoswhole">
              ${ProgressOverall > 100 ? "100%+":ProgressOverall+"%"}
              </div>
              <div class="contentinfostatshidden" id="contentinfoswholehidden">
                ${Words} / ${MaxWords} words
              </div>
            </div>
          </div>
          <div class="c-v-c-s">
              <div class="c-v-c-s-t">
                <span class="material-symbols-outlined">
                speed
                </span>
                Strike
              </div>
              <div class="strikeDays">
                Your strike is ${StrikeCount} day${StrikeCount>1?"s":""} long
              </div>
              <div class="strikeBallContent">
                <div class="strikeBall" id="strikeBall1"></div>
                <div class="strikeBall" id="strikeBall2"></div>
                <div class="strikeBall" id="strikeBall3"></div>
                <div class="strikeBall" id="strikeBall4"></div>
                <div class="strikeBall" id="strikeBall5"></div>
                <div class="strikeBall" id="strikeBall6"></div>
                <div class="strikeBall" id="strikeBall7"></div>
                <div class="strikebar"></div>
              </div>
          </div>
        </div>
      </div>
      <div class="content-infos">
        <div class="c-v-c-mt">
          Informations
        </div>
          <div class="content-infos-infos">
              <div class="content-desc">
              <span class="material-symbols-outlined">
              description
              </span>
              ${goal.details}
            </div>
            <div class="content-stats">
              <span class="material-symbols-outlined">
              percent
              </span>
              Objective : ${MaxWords} words
            </div>
            <div class="content-stats">
              <span class="material-symbols-outlined">
              timer
              </span>
              Ends in ${TimeUntil} days (${
                Ends.getDate()>9?Ends.getDate():"0"+Ends.getDate()
              }/${
                Ends.getMonth()+1>9?Ends.getMonth()+1:"0"+(Ends.getMonth()+1)
              }/${Ends.getFullYear()})
            </div>
          </div>
          <div id="buttonpjjump" onclick="OpenFolder({id:'pj-open-${InCharge}'})" style="visibility:${goal.finished?"hidden":"visible"}">
            Delete & change status in ${InCharge}
          </div>
      </div>
      <div class="content-info-updates" id="content-info-updates">
        <div class="c-v-c-mt">
          Updates
        </div>
      </div>
    </div>
  `;  
  if (StrikeCount>7) StrikeCount=7;
  let Content = document.getElementById('c-v-content-stats');
  if(y===false) {
    document.getElementById('bartoday').style.width = (Content.offsetWidth*ProgressToday)/100+"px";
    document.getElementById('barwhole').style.width = (Content.offsetWidth*ProgressOverall)/100+"px";
    for (let i = 1; i < StrikeCount+1; i++) {
      document.getElementById(`strikeBall${i}`).style.backgroundColor="FFC55C"
    }
  }

  for (let [key,value] of Object.entries(goal.updates)) {
      document.getElementById('content-info-updates').innerHTML+=`
        <div class="update">
          <div class="updateday">
            Day ${parseInt(key)+1}
          </div>
          <div class="updatecount">
            ${value}
          </div>
          <div class="updatedel" id="${key}" onclick="DelUpdate(this)" style="visibility:${goal.finished?"hidden":"visible"}">
            <span class="material-symbols-outlined" style="cursor:pointer">
            delete
            </span>
          </div>
        </div>
      `;
  }
  if (y!=false) {
    document.getElementById('child-viewer').style.visibility = "visible";
    document.getElementById('child-viewer').style.position = "relative";

  }
}

function DelUpdate(el) {
  let goal = JSON.parse(localStorage.getItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`));
    goal.words-=goal.updates[parseInt(el.id)]
    delete goal.updates[parseInt(el.id)]
    console.log(goal)
    localStorage.setItem(`${InCharge}-goal-${parseInt(Current_goal.replace('_',''))-1}`,JSON.stringify(goal))
    OpenStats();
    return;
}
