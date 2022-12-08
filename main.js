let tasks=[]
function loadFromStorage(){
    const json=localStorage.getItem("tasks")
    if(json)
    tasks=JSON.parse(json)
    displayNote()    
}

function showMetask()
{
    getInformation()
   
}
function getInformation()
{
    const details=document.getElementById("details").value
    const date=document.getElementById("date").value
    const hour=document.getElementById("hour").value

    const object={
        details:details,
        date:date,
        hour:hour}

        if(details===""||date===""||hour==="")
        { event.preventDefault()
         alert("You are missing information")
        return
        }
        tasks.push(object)
        setLocalStorage()
        addNote()
        clearForm()
}
function clearForm(){
    document.getElementById("details").value=""
    document.getElementById("date").value=""
    document.getElementById("hour").value=""    
}

function displayNote()
{    const notes= document.getElementById("notes")
     let html=""
     let index=0
     for (let task of tasks){
        index++
            html+= `<div id="notes${index}" class="col notes" onmouseover="showX(${index})"onmouseleave="hideX(${index})">
            <i  class="bi bi-x-circle hide" onclick="clearNote(${index})" id="x${index}"></i>
            <pre id="test">
            <div class="details" >
            ${task.details}     
            </div>
          </pre>
        
            <div id="time">
            <span class="date">${task.date}</span>
            <span class="hour">${task.hour}</span>
            </div>
            </div>`
            
        }
        notes.innerHTML=html
        
} 
function addNote()
{ 
    const notes= document.getElementById("notes")
    let active = document.querySelector(".notes-animation");
    if(active!=null)
    active.classList.remove("notes-animation");

        let html="";
        let index=tasks.length
                html+= `<div id="notes${index}" class="col notes notes-animation" onmouseover="showX(${index})" onmouseleave="hideX(${index})">
                <i  class="bi bi-x-circle hide" onclick="clearNote(${index})" id="x${index}"></i>
                <pre id="test">
                <div class="details" >
                ${tasks[index-1].details}     
                </div>
            </pre>
            
                <div id="time">
                <span class="date">${tasks[index-1].date}</span>
                <span class="hour">${tasks[index-1].hour}</span>
                </div>
                </div>`
        
            notes.innerHTML+=html
} 

function setLocalStorage(){
    let json=JSON.stringify(tasks)
    localStorage.setItem("tasks",json)
}

function clearNote(indexClear){
    console.log($(document).find(`#notes${indexClear}`))
$(document).find(`#notes${indexClear}`).css("display","none")
tasks.splice(indexClear-1,1)
console.log(tasks)
 setLocalStorage()
 displayNote()
}
function showX(index){
    $(document).find(`#x${index}`).css("display","inline")   
}
function hideX(index){
    $(document).find(`#x${index}`).css("display","none")   
}
