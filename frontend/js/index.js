document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("user-list");
  const addUser = document.getElementById("add-btn");
  const editModal = document.getElementById("editModal");
  const editName = document.getElementById("edit-name");
  const editEmail = document.getElementById("edit-email");
  const editPartof = document.getElementById("edit-part_of");
  const updateBtn = document.getElementById("update-btn");
  const closeBtn = document.querySelectorAll(".close-btn");

  //* Function to fetch and display users from the API backend
  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:4500/api/v1/user/all");
      const resp = await response.json();
      const users = resp.data.users;
      userList.innerHTML = ""; //* Clear the user list before adding new data
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.part_of}</td>
        <td>
          <button class="btn btn-info edit-button" data-id="${user.id}">Edit</button>
          <button class="btn btn-danger delete-button" data-id="${user.id}">Delete</button>
        </td>
      `;
        userList.appendChild(row);
      });
      //* For handle delete & edit
      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", handleDelete);
      });

      const editButtons = document.querySelectorAll(".edit-button");
      editButtons.forEach((button) => {
        button.addEventListener("click", handleEdit);
      });
    } catch (error) {
      console.error("Error Fetching Users:", error);
    }
  }

  //! for handle delete button

  async function handleDelete(e) {
    const id = e.target.dataset.id;
    const response = await fetch(
      ` http://localhost:4500/api/v1/user/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    try {
      if (response.ok) {
        fetchUsers();
      } else {
        throw new Error("Error Deleting User");
      }
    } catch (error) {
      console.error("Error Deleting User:", error);
    } finally {
      // The error variable is now defined in the finally block
      if (error) {
        console.error("Error Deleting User:", error);
      }
    }
  }

  //! Function to fetch user data by ID and handle the edit process
  async function handleEdit(event) {
    const id = event.target.dataset.id;
    try {
      // Fetch user data by ID
      const response = await fetch(`http://localhost:4500/api/v1/user/${id}`);

      if (!response.ok) {
        throw new Error(
          `Error fetching user: ${response.status} ${response.statusText}`
        );
      }

      const user = await response.json();

      // Set modal input fields to the user's data
      editName.value = user.name;
      editEmail.value = user.email;
      editPartof.value = user.part_of;

      // Display the modal
      editModal.style.display = "block";

      // Update the user
      updateBtn.addEventListener("click", async () => {
        const newName = editName.value;
        const newEmail = editEmail.value;
        const newPartOf = editPartof.value;

        // Check if all fields are filled
        if (newName && newEmail && newPartOf) {
          try {
            // Send a PATCH request to the API
            const patchResponse = await fetch(
              `http://localhost:4500/api/v1/user/edit/${id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: newName,
                  email: newEmail,
                  part_of: newPartOf,
                }),
              }
            );

            if (!patchResponse.ok) {
              throw new Error(
                `Error updating user: ${patchResponse.status} ${patchResponse.statusText}`
              );
            }

            // If the request is successful, update the users list and close the modal
            fetchUsers();
            closeEditUsers();
          } catch (error) {
            console.error("Error updating user:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  // Close the modal
  function closeEditUsers() {
    if (editModal && editName && editEmail && editPartof) {
      editModal.style.display = "none";
      editName.value = "";
      editEmail.value = "";
      editPartof.value = "";
    } else {
      console.error("One or more required elements not found in the DOM.");
    }
  }

  // Close the modal when clicked
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", closeEditUsers);
  });

  //! for handle add
  addUser.addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const part_of = document.getElementById("part_of").value;
    if (name && email && part_of) {
      try {
        const response = await fetch(`http://localhost:4500/api/v1/user/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, part_of }),
        });

        if (response.ok) {
          fetchUsers();
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("part_of").value = "";
        } else {
          console.error(
            "Failed to add user. Server returned:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error Adding User:", error);
      }
    }
  });

  fetchUsers();
});
