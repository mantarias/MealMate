const container = document.querySelector("#container");

document.addEventListener("DOMContentLoaded", (e) => {
    OnStartfetchDataOnce()
})

let private_user_Item_property_data;
function OnStartfetchDataOnce() {
    fetch("/API/GetPrivateProtertyList")        
    .then((response) => {               
        if (response.ok) {              
            return response.json();
        }
        throw new Error("response was not in the 200 range ") 
    })    
    .then((data) => {
        private_user_Item_property_data=data
        createTable(data)        
    })                        
    .catch((error) => {                                       
        alert("An error occured");                            
    });
}

function createTable(data) {
    data.forEach((element, index) => {
        createItem(element, index)
    });

}

function createItem(element, index) {
//Part 1      This part will create the first seen not expanded tr rows.
    
    //Tr is our row where we will put things in
    let tr = document.createElement("tr");
    let name = document.createElement("td");
    name.textContent = element.name;
    // ButtonContainer will be a container box where our function for the button will be stored
    let buttonContainer = document.createElement("td");
    let expand= document.createElement("button");
        expand.textContent="Se more & edit"

    let Delete_item=document.createElement("button");
        Delete_item.textContent="Delete Item"
    
    buttonContainer.appendChild(expand);
    buttonContainer.appendChild(Delete_item);
    
    Delete_item.addEventListener("click", ()=> {

        let data_To_server = {
            name: element.name
        }
        fetch("/API/ppDeleteitem", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data_To_server)
          })
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(data => {
              console.log("Response from server:", data);
            })
            .catch(error => {
              console.error("Error sending POST request:", error);
            });

        tr.parentNode.removeChild(tr);
    })

        expand.addEventListener("click", () => {
            if (hiddenRow.style.display === "none") {
              hiddenRow.style.display = "table-row";
              expand.textContent = "Hide Details";
            } else {
              hiddenRow.style.display = "none";
              expand.textContent = "Se more & edit";
            }
          });

    let hiddenRow = document.createElement("tr");
let textbox1=document.createElement("tr")
textbox1.style.fontSize="20px"
textbox1.textContent="Property"
hiddenRow.appendChild(textbox1)
function printPropertyNames(obj) {
    for (let propName in obj) {
      
      if (propName==="name"){continue;}
        else{
         let prop_containtainer=document.createElement("tr")   
         let property_name=document.createElement("input") 
         let property_value=document.createElement("input")
         let delete_prop=document.createElement("button")
         delete_prop.textContent="Delete";
         property_name.placeholder=propName;
         property_value.placeholder=obj[propName]
        prop_containtainer.appendChild(property_name)
        prop_containtainer.appendChild(property_value)



            delete_prop.addEventListener("click", ()=>{
                const propName = property_name.placeholder;
                const propValue = property_value.placeholder;

                console.log(`Deleting ${propName} : ${propValue}`);
                console.log(element)
                let Deleted_data={
                    name:element.name,
                    properties:propName
                }

                fetch("/API/ppDeleteProperti", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(Deleted_data)
                  })
                    .then(response => {
                      if (!response.ok) {
                        throw new Error("Network response was not ok");
                      }
                      return response.json();
                    })
                    .then(data => {
                      console.log("Response from server:", data);
                    })
                    .catch(error => {
                      console.error("Error sending POST request:", error);
                    });

                prop_containtainer.parentNode.removeChild(prop_containtainer);
                console.log("tried at least")
            })


        prop_containtainer.appendChild(delete_prop)
        hiddenRow.appendChild(prop_containtainer)
        }
         
      //console.log(propName)
      //console.log(obj[propName])  
    }
  }
 

// function call that will start the hidden print of properties
  printPropertyNames(element);

    //let hiddenCell = document.createElement("td");
   // hiddenCell.colSpan = "2";
   // hiddenCell.textContent = "WAOW IT WORKS NOW";
    //hiddenRow.appendChild(hiddenCell);
    hiddenRow.style.display = "none";
  
  

    


    tr.appendChild(name);
    tr.appendChild(buttonContainer);
    container.appendChild(tr);
    container.appendChild(hiddenRow);
}

