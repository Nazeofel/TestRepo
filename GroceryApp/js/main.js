let cardTitle;
let itemName;
let itemListUndefined;
let localArray = [];
let idArray = [];
let indexId = 0;

const addButton  = document.querySelector(".categoryListAdd");
const mainSection = document.querySelector(".groceryLists");
const cardTitleIsNullOrEmpty = cardTitle === null || cardTitle === ""
const itemNameIsNullOrEmpty = itemName === null || itemName === ""
const itemListIsUndefined = itemListUndefined !== undefined || itemListUndefined > 0;

console.log("THE FILE HAS BEEN CORRECTLY IMPORTED AND EXECUTED");

/*
 TO DO :

    Find a way to get the highest Id and put it as the index !  ! DONE

    Make the delete function (has to delete from the row and from the array) !   TO BE DONE 

    // Make an add item function // DONE (and loads in real time ! );

*/


// Get datas functions ! 

Object.values(localStorage).forEach((value) => {
    localArray.push(value)
  });

localArray.forEach((el) => {
    let parsedObject = JSON.parse(el);

    console.log(parsedObject);

    let parsedObjectName = parsedObject["name"];
    let parsedObjectListItems = parsedObject["items"];
    let parsedObjectId = parsedObject["id"];

    idArray.push(parsedObjectId);

    let newSection = document.createElement("section");
    newSection.classList.add("groceryContainer");
    // Creating the Ttitle Div and appending the text to it 
    let newTitleDiv = document.createElement("div");
    newTitleDiv.classList.add("groceryTitle");
    const  title = document.querySelector(".groceryTitle");
    let text = document.createTextNode(parsedObjectName);
    newTitleDiv.appendChild(text);

    // Creating the GroceryDiv
    let newGroceryDiv = document.createElement("div");
    newGroceryDiv.classList.add("groceryList");

    let newList  = document.createElement("ul");

    // creation of the add button
    let newButton  = document.createElement("button");
    let buttonCross = document.createElement('i');
    newButton.classList.add("addItem");
    buttonCross.classList.add('fa-solid');
    buttonCross.classList.add('fa-plus');
    newButton.setAttribute('id', parsedObjectId);

    // Appending it all to the mainSection div
    mainSection.append(newSection);
    newSection.append(newTitleDiv);
    newSection.append(newGroceryDiv);
    newGroceryDiv.append(newList);
    newGroceryDiv.append(newButton);
    newButton.append(buttonCross);

    if(parsedObjectListItems != itemListIsUndefined){
        parsedObjectListItems.forEach((el) => {
            let newLi = document.createElement("li");
            let itemList = document.createTextNode(el);
            newList.append(newLi);
            newLi.append(itemList);
            newLi.addEventListener("click", deleteRow);
        });
    } else {
        console.log("no items");
    }

    newTitleDiv.addEventListener("click", deleteList);
    newButton.addEventListener("click", addItem);
});

function max(){
    let val = 0;
    for(let i = 0; i < idArray.length; i++){
        if(val < idArray[i]){
            val = idArray[i];
        }
    }
    console.log(val);
}

// CRUD functions ! 

function addGroceryList(){
     cardTitle  = prompt("Enter the name of the grocery list ! ");
     while(!cardTitle){
        cardTitle  = prompt("Enter the name of the grocery list ! ");
     }
     if(cardTitleIsNullOrEmpty){
        return;
    } else {
        indexId++;
        // Creating the Section ! 
        let newSection = document.createElement("section");
        newSection.classList.add("groceryContainer");
        // Creating the Ttitle Div and appending the text to it 
        let newTitleDiv = document.createElement("div");
        newTitleDiv.classList.add("groceryTitle");
        const  title = document.querySelector(".groceryTitle");
        let text = document.createTextNode(cardTitle);
        newTitleDiv.appendChild(text);

        // Creating the GroceryDiv
        let newGroceryDiv = document.createElement("div");
        newGroceryDiv.classList.add("groceryList");

        let newList  = document.createElement("ul");

        // creation of the add button
        let newButton  = document.createElement("button");
        let buttonCross = document.createElement('i');
        newButton.classList.add("addItem");
        buttonCross.classList.add('fa-solid');
        buttonCross.classList.add('fa-plus');
        newButton.setAttribute('id', indexId);

        // Appending it all to the mainSection div
        mainSection.append(newSection);
        newSection.append(newTitleDiv);
        newSection.append(newGroceryDiv);
        newGroceryDiv.append(newList);
        newGroceryDiv.append(newButton);
        newButton.append(buttonCross);


        newTitleDiv.addEventListener("click", deleteList);
        newButton.addEventListener("click", addItem);

        const object = {
            "id": indexId,
            "name": text.textContent,
            "items": []
        };
            window.localStorage.setItem(indexId, JSON.stringify(object));

            
    }
}

function deleteList(e){
    let target = e.target;
    let parentNode = target.parentNode;
    let nextEl = target.nextElementSibling;
    let listId = nextEl.children[1].getAttribute("id");
    localStorage.removeItem(listId);
    parentNode.remove();
    
}

function deleteRow(e){
   let target = e.target;
   let innerHtml = target.innerHtml;
   let parentNode = target.parentNode;
   let prevElement = parentNode.nextElementSibling;

   let updateObject = JSON.parse(localStorage.getItem(prevElement.getAttribute("id")));
   let objectArray = updateObject["items"];
   objectArray.splice(innerHtml, 1);

   window.localStorage.setItem(prevElement.getAttribute("id"), JSON.stringify(updateObject));
   target.remove();
}

function addItem(e){
    let target = e.target;
    itemName  = prompt("Enter the name of the grocery list ! ");
    if(itemNameIsNullOrEmpty){
        return;
    } else {
        let updateObject = JSON.parse(localStorage.getItem(target.getAttribute("id")));
        updateObject["items"].push(itemName);
        let prevElement = target.previousElementSibling;
       
        let newLi = document.createElement("li");
        let itemList = document.createTextNode(itemName);
        prevElement.append(newLi);
        newLi.append(itemList);

        newLi.addEventListener("click", deleteRow);

        window.localStorage.setItem(target.getAttribute("id"), JSON.stringify(updateObject));
    }
}


// Adding events ! 

addButton.addEventListener("click", addGroceryList);

// Storage Maintainers ! 

function getLocalStorage(){
    for(let obj in localStorage){
         console.log(localStorage[obj]);
     }
 }
 
 function clearLocalStorage(){
     localStorage.clear();
 }
 
