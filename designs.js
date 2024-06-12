///// welcome page
// create the colorful splash gird
const splashGrid = document.getElementById('splashGrid')
for (let grid =1; grid <= 225; grid++){
    const newGrid = document.createElement('div');
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`
    newGrid.setAttribute("id", "grid"+String(grid));
    newGrid.setAttribute("style", "background-Color: "+rndCol);
    splashGrid.appendChild(newGrid);
}

splashGrid.addEventListener('mouseover', (event) => {
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    event.target.setAttribute("style", "background-Color: "+rndCol);
})

function random(number) {
    return Math.floor(Math.random() * (number+1));
  }

// add event listener to remove the welcome page and reveal the action phase 
const beginDesign = document.getElementsByClassName('beginDesign')[0]
beginDesign.addEventListener('click',() => {
    document.getElementById('welcomePage').style.display= 'none';
    document.getElementById('actionPhase').style.display= 'block';
    // setting maximum canvas width to the width of the (div - padding)
    const widthSetting = document.getElementById("inputWidth");
    console.log(document.querySelector('div#actionPhase'))
    console.log(document.querySelector('div#actionPhase').clientWidth)
    console.log(document.querySelector('div#actionPhase').offsetWidth)
    widthSetting.setAttribute("max", Math.floor((document.querySelector('div#actionPhase').offsetWidth - 64)/6))
    })

///// actionPhase


// make grid using user's input
const form = document.getElementById('sizePicker');
form.addEventListener('submit', (event) => {event.preventDefault()});
form.addEventListener('submit', makeGrid);

// remove EmptySate
form.addEventListener('submit',()=>{
    if (document.getElementsByClassName('emptyState')[0] !== null && document.getElementsByClassName('emptyState')[0] !== undefined){
        document.getElementsByClassName('emptyState')[0].remove();
    }
})

function makeGrid(){ 
    // let gridSize = document.getElementById("gridSize").value +'px';
    const tbl = document.getElementById('pixelCanvas');   
    if (tbl.childElementCount > 0){
        tbl.textContent = '';
    }        
    const heightValue = document.getElementById("inputHeight").value;
    const widthValue = document.getElementById("inputWidth").value;
    gridSize = Math.floor((document.querySelector('div#actionPhase').offsetWidth - 64)/widthValue)+'px';
    const body = document.body;
    // create the row and columns 
    for (let row = 1; row <= heightValue; row++) {
        const newRow = document.createElement('tr');
        newRow.style.width = gridSize;
        newRow.style.height = gridSize;
        tbl.appendChild(newRow);
        for (let column =1; column <= widthValue; column++){
            const newGrid = document.createElement('td');
            newGrid.style.width=gridSize;
            newRow.appendChild(newGrid);
        }
        tbl.style.backgroundColor ='#FFFFFF';
    }
    // also clear the form setting
    document.getElementById('setUp').value="Set up a new canvas";
    document.getElementById("inputHeight").value="1";
    document.getElementById("inputWidth").value="1";
    // document.getElementById('gridSize').value = "20";
}

// Get color value after the user submitted the value and use that as grid background
const tbl = document.getElementById('pixelCanvas');   

// for adding colors 
tbl.addEventListener('mouseover', (event) => { 
    console.log(event.buttons)
    if (event.buttons === 2 && event.target.nodeName === 'TD'){
        event.target.style.backgroundColor = '#FFFFFF';
    } else if (event.buttons === 1 && event.target.nodeName === 'TD'){
        const colorPicker = document.getElementById('colorPicker');
        let colorChoice = colorPicker.value;
        console.log('what is current color: ' + colorChoice);
        event.target.style.backgroundColor = colorChoice;

    // if (event.buttons == 1 && event.target.nodeName === 'TD'){
    //     const colorPicker = document.getElementById('colorPicker');
    //     let colorChoice = colorPicker.value;
    //     console.log('what is current color: ' + colorChoice);
    //     event.target.style.backgroundColor = colorChoice;
    // } else if (event.buttons == 2 && event.target.nodeName === 'TD'){
    //     event.target.style.backgroundColor = '#FFFFFF';
    }
})

tbl.addEventListener('mousedown', (event) => { 
    console.log(event.target.toString())
    if (event.buttons === 1 && event.target.nodeName === 'TD'){
        const colorPicker = document.getElementById('colorPicker');
        let colorChoice = colorPicker.value;
        console.log('what is current color: ' + colorChoice);
        event.target.style.backgroundColor = colorChoice
    } else if (event.buttons === 2 && event.target.nodeName === 'TD'){
        event.target.style.backgroundColor = '#FFFFFF';
    }
})

// blocking context menu on right click on the table element 
// https://stackoverflow.com/questions/4235426/how-can-i-capture-the-right-click-event-in-javascript
const eraserColor = '#FFFFFF';

tbl.addEventListener('contextmenu', function(event,eraserColor) {
    event.preventDefault();
    event.target.style.backgroundColor = eraserColor;
    return false;}, 
false)

// enable erase mode on right click 
tbl.addEventListener('rightclick', (event) => { 
    console.log(event.target.toString())
    if (event.target.nodeName === 'TD'){
        const colorPicker = document.getElementById('colorPicker');
        let colorChoice = colorPicker.value;
        console.log('what is current color: ' + colorChoice);
        event.target.style.backgroundColor = colorChoice}
    },
)



// reset the form 
const resetButton = document.getElementsByTagName('button')[1];
resetButton.addEventListener('click', () => {
var allTableCells = document.getElementsByTagName("td");
for(let i = 0, max = allTableCells.length; i < max; i++) {
    let cell = allTableCells[i];
    cell.style.backgroundColor = '#FFFFFF';
}})


// future PIs:
// 1) add number to grid 
// 3) add eraser 