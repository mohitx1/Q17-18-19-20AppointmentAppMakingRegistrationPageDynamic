function addNewLineElement(object) {
    const ul = document.getElementById("listOfPeople");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(object.name + " " + object.emailId + " "));
  
    const editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "Edit";
    editButton.addEventListener("click", () => {
      document.getElementById("name").value = object.name;
      document.getElementById("email").value = object.emailId;
      li.remove();
    });
    editButton.className = "edit-button";
    editButton.style.border = "2px solid green";
    li.appendChild(editButton);
  
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "Delete";
    deleteButton.addEventListener("click", async () => {
      try {
        await axios.delete(`https://crudcrud.com/api/640b2cb724e342ad98f7ef352af77f07/crudapitesting/${object._id}`);
        li.remove();
      } catch (error) {
        console.log(error);
      }
    });
    deleteButton.className = "delete-button";
    deleteButton.style.border = "2px solid red";
    li.appendChild(deleteButton);
  
    ul.appendChild(li);
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/640b2cb724e342ad98f7ef352af77f07/crudapitesting")
      .then((response) => {
        const userList = response.data;
        userList.forEach((user) => {
          addNewLineElement(user);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const emailId = document.getElementById("email").value;
    const name = document.getElementById("name").value;
  
    if (emailId.length > 0 && name.length > 0) {
      const object = {
        name: name,
        emailId: emailId
      };
  
      try {
        const response = await axios.post("https://crudcrud.com/api/640b2cb724e342ad98f7ef352af77f07/crudapitesting", object);
        console.log(response.data);
        addNewLineElement(response.data);
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
      } catch (error) {
        console.log(error);
      }
    }
  });