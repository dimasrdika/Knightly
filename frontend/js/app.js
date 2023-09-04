document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("user-list");
  const addUser = document.getElementById("add-btn");
  const editModal = document.getElementById("edit-modal");
  const editName = document.getElementById("edit-name");
  const editAge = document.getElementById("edit-age");
  const editBirthDate = document.getElementById("edit-birth-date");
  const editEmail = document.getElementById("edit-email");
  const editPartof = document.getElementById("part_of");
  const updateBtn = document.getElementById("update-btn");

  // Function to fetch and display users from the API backend
  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:4500/api/v1/user");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      userList.innerHTML = ""; // Clear the user list before adding new data
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.birth_date}</td>
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

  // Call the fetchUsers function to fetch and display users when the DOM is loaded
  fetchUsers();
});
