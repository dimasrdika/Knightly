document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("user-list");
  const addUser = document.getElementById("add-btn");
  const editModal = document.getElementById("edit-modal");
  const editName = document.getElementById("edit-name");
  const editEmail = document.getElementById("edit-email");
  const editPartof = document.getElementById("part_of");
  const updateBtn = document.getElementById("update-btn");
  const closeBtn = document.getElementById("close-btn");

  // Function to fetch and display users from the API backend
  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:4500/api/v1/user/all");
      const resp = await response.json();
      const users = resp.data.users;
      userList.innerHTML = ""; // Clear the user list before adding new data
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.part_of}</td>
        <td>
          <button class="btn btn-primary edit-button" data-id="${user.id}">Edit</button>
          <button class="btn btn-danger delete-button" data-id="${user.id}">Delete</button>
        </td>
      `;
        userList.appendChild(row);
      });

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

  // for handle delete button
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
  async function handleEdit(event) {
    const id = event.target.dataset.id;

    // Fetch users data by ID
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/edit/${id}`
      );
      const users = await response.json();

      // Populate modal inputs with student data
      editName.value = users.name;
      editEmail.value = users.email;
      editPartof.value = users.part_of;

      // Display modal
      editModal.style.display = "block";

      // Update users data on "Update" button click
      updateBtn.addEventListener("click", async () => {
        const newName = editName.value;
        const newEmail = editEmail.value;
        const newPartOf = editPartof.value;

        if (newName && newEmail && newPartOf) {
          try {
            const response = await fetch(
              `http://localhost:3000/api/v1/userss/${id}`,
              {
                method: "PUT",
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

            if (response.ok) {
              fetchuserss(); // Refresh the list after editing
              closeEditModal();
            }
          } catch (error) {
            console.error("Error editing users:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Close modal function
  function closeEditModal() {
    editModal.style.display = "none";
    editName.value = "";
    editEmail.value = "";
    editPartof.value = "";
  }

  // Close modal when close button is clicked
  for (let closeButton of closeBtn) {
    closeButton.addEventListener("click", closeEditModal);
  }
  // for handle edit
  // async function handleEdit(event) {
  //   const id = event.target.dataset.id;

  //   // Fetch user data by ID
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4500/api/v1/user/edit/${id}`
  //     );
  //     const user = await response.json();

  //     // Set modal input fields to the user's data
  //     editName.value = user.name;
  //     editEmail.value = user.email;
  //     editPartof.value = user.class;

  //     // Display the modal
  //     editModal.style.display = "block";

  //     // Update the user
  //     updateBtn.addEventListener("click", async () => {
  //       const newName = editName.value;
  //       const newEmail = editEmail.value;
  //       const newPartOf = editPartof.value;

  //       // Check if all fields are filled
  //       if (newName && newEmail && newPartOf) {
  //         try {
  //           // Send a PATCH request to the API
  //           const response = await fetch(
  //             `http://localhost:4500/api/v1/user/edit/${id}`,
  //             {
  //               method: "PATCH",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 name: newName,
  //                 email: newEmail,
  //                 class: newPartOf,
  //               }),
  //             }
  //           );

  //           // If the request is successful, update the users list and close the modal
  //           if (response.ok) {
  //             fetchUsers();
  //             closeEditUsers();
  //           }
  //         } catch (error) {
  //           console.error("Error updating user:", error);
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //   }
  // }

  // for handle add
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
          body: JSON.stringify({ name, email, class: part_of }),
        });
        if (response.ok) {
          fetchUsers();
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("part_of").value = "";
        }
      } catch (error) {
        console.error("Error Adding User:", error);
      }
    }
  });
  // //for handle edit
  // async function handleEdit(event) {
  //   const id = event.target.dataset.id;

  //   // Fetch user data by ID
  //   try {
  //     const response = await fetch(
  //       `http://localhost:4500/api/v1/user/edit/${id}`
  //     );
  //     const user = await response.json();

  //     // Set modal input fields to the user's data
  //     editName.value = user.name;
  //     editEmail.value = user.email;
  //     editPartof.value = user.class;

  //     // Display the modal
  //     editModal.style.display = "block";

  //     // Update the user
  //     updateBtn.addEventListener("click", async () => {
  //       const newName = editName.value;
  //       const newEmail = editEmail.value;
  //       const newPartOf = editPartof.value;

  //       // Check if all fields are filled
  //       if (newName && newEmail && newPartOf) {
  //         try {
  //           // Send a PATCH request to the API
  //           const response = await fetch(
  //             `http://localhost:4500/api/v1/user/edit/${id}`,
  //             {
  //               method: "PATCH",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 name: newName,
  //                 email: newEmail,
  //                 class: newPartOf,
  //               }),
  //             }
  //           );

  //           // If the request is successful, update the users list and close the modal
  //           if (response.ok) {
  //             fetchUsers();
  //             closeEditUsers();
  //           }
  //         } catch (error) {
  //           console.error("Error updating user:", error);
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //   }
  // }

  // // Close the modal
  // function closeEditUsers() {
  //   editModal.style.display = "none";
  //   editName.value = "";
  //   editEmail.value = "";
  //   editPartof.value = "";
  // }

  // // Close the modal when clicked
  // for (let closeBtn of closeBtns) {
  //   closeBtn.addEventListener("click", closeEditUsers);
  // }

  fetchUsers();
});
