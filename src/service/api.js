import toast from "react-hot-toast";

import { formatDateTime } from "../util/formatDateTime";

export const getAllUsers = (fetchAllUsers, setIsLoading) => {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      fetchAllUsers(data);
      setIsLoading(false);
    })
    .catch((error) => console.log(error));
};

export const fetchUserImage = (setImageUrl) => {
  fetch("https://picsum.photos/200/300")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      setImageUrl(imageUrl);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export const confirmDelete = (selectedUser, deleteUser, setShowDeleteModal) => {
  fetch(`http://localhost:3000/users/${selectedUser.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok === true) {
        deleteUser(selectedUser.id);
      }
      setShowDeleteModal(false);
      toast.success("User successfully deleted");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

export const confirmUpdate = (selectedUser, setShowEditModal, updateUser) => {
  fetch(`http://localhost:3000/users/${selectedUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: selectedUser.id,
      name: selectedUser.name,
      address: selectedUser.address,
      gender: selectedUser.gender,
      inputDate: formatDateTime(Date.now()),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      updateUser(selectedUser.id, data);
      setShowEditModal(false);
      toast.success("User successfully edited");
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
