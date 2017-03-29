var liId = 0;
var aId = (liId + 1) * 1000;

function todoTask() {
    
    var task = document.getElementById("txtTodo").value;
    var radioButton = "<input type='radio' class='btnRad'/>"; // creating a radio button.

    var ul = document.getElementById("list"); // getting the UI element to append LI.
    

    var li = document.createElement("LI"); // creating LI element.
    li.setAttribute("id", liId);
    var liText = document.createTextNode(task); // adding text from text box to the LI element.

    li.innerHTML = radioButton; // adding radio button and the text to the LI element.
    li.appendChild(liText);
    
    ul.appendChild(li); // adding LI to UI.

    var ulActive = document.getElementById("activeList"); // getting the UI element to append LI.
    var liActive = document.createElement("LI"); // creating LI element
    liActive.setAttribute("id", liId);
    var liTextActive = document.createTextNode(task); // adding text from text box to the LI element.
    liActive.appendChild(liTextActive);
    
    ulActive.appendChild(liActive);

    document.getElementById("txtTodo").value = ""; // making the text box empty
    liId++;
    aId++;
}


function allTasks() {

    document.getElementById("todo").style.display = "block";
    document.getElementById("active").style.display = "none";
    document.getElementById("completed").style.display = "none";

    todoCount("list");
}


function activeTasks() {
    document.getElementById("active").style.display = "block";
    document.getElementById("completed").style.display = "none";
    document.getElementById("todo").style.display = "none";

    todoCount("activeList");
}


function completedTasks() {
    document.getElementById("completed").style.display = "block";
    document.getElementById("todo").style.display = "none";
    document.getElementById("active").style.display = "none";

    todoCount("completedList");
}


function add(event)
{
    event = event || window.event;


    var targetElement = event.target || event.srcElement;
    var completedList = document.getElementById("completedList");       // id of completed list

    var activeList = document.getElementById("activeList");             // id of active list.

    var li = document.createElement("LI");  // creating a new li element.
    li.setAttribute("id", targetElement.id); // setting id for the added element. Id will the same as in the "all tasks" list.

    var liText = document.createTextNode(targetElement.innerText); // text for li.


    li.appendChild(liText);                 // appending text to li.

    var id = targetElement.id;

    if (targetElement.className == "strike")  // if strikethrough then add to completed list and remove from active.
    {
        completedList.insertBefore(li, completedList.childNodes[targetElement.id]);  // inserting in completed list.
        
        activeList.removeChild(activeList.childNodes[targetElement.id]);                   // removing from active list.
    }

    else if(targetElement.className == "")  // if strikethrough removed, then add to active, remove from completed.
    {
        activeList.insertBefore(li, activeList.childNodes[targetElement.id]);

        var newList = completedList.getElementsByTagName("li");
        for(var i = 0; i < newList.length; i ++)
        {
            var newId = newList[i].getAttribute("id");
            if(targetElement.id == newList[i].getAttribute("id"))
            {
                completedList.removeChild(completedList.childNodes[i]);
            }
        }
    }

}



function clearCompletedList()
{
    var completedList = document.getElementById("completedList").getElementsByTagName("li");      // id of completed list

    var len = completedList.length;
    for (var i = 1; i <= len; i++)
    {
        var child = completedList.childNodes[i];
        completedList.removeChild(completedList.childNodes[i]);
        //activeList.removeChild(activeList.childNodes[targetElement.id]);
    }
}


$(document).ready(function () {
    $("#list").on('click', 'li', function () {
        $(this).toggleClass('strike'); // updating the css to strikethrough on click of LI element
    });
});



function handCursor() // change mouse cursor from pointer to hand on hover
{
    var list = document.getElementById("list").getElementsByTagName("li");

    for (var i = 0; i < list.length; i++) {
        list[i].onmouseover = function () {
            this.style.cursor = 'hand';

        }
    }

    for (var i = 0; i < list.length; i++) {
        list[i].onmouseout = function () {
            this.style.cursor = 'pointer';

            
        }
    }
}


function todoCount(listName) // count of elements in the todo list.
{
    var li = document.getElementById(listName).getElementsByTagName("li");
    var count = 0;
    count = li.length;

    document.getElementById("todoCount").innerHTML = count + " items.";
}

function addToList(event) // function to perform a function when ENTER button is pressed.
{
    event = event || window.event;

    if (event.keyCode == 13) {
        todoTask();
        todoCount("list");
    }
    handCursor();

}