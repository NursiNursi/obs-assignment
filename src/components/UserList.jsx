import { Col, Container, Row, Table } from "react-bootstrap";

import {
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "../redux/actions/userActions";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { connect } from "react-redux";
import AddUser from "./AddUser";
import ModalComponent from "./ui/ModalComponent";
import FormComponent from "./ui/FormComponent";
import DetailComponent from "./ui/DetailComponent";

function UserList({ userData, fetchAllUsers, deleteUser, updateUser }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => fetchAllUsers(data))
      .catch((error) => console.log(error));
  };

  const handleView = (userInfo) => {
    setShowViewModal(true);
    setSelectedUser(userInfo);
  };

  const handleEdit = (userInfo) => {
    console.log(userInfo);
    setShowEditModal(true);
    setSelectedUser(userInfo);
  };

  const confirmUpdate = () => {
    const formatDateTime = (timestamp) => {
      const formattedDate = new Date(timestamp).toLocaleDateString("in-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return formattedDate.replace("pukul ", "").replace(".", ":");
    };

    const formatDateTimeBorn = (timestamp) => {
      const formattedDate = new Date(timestamp).toLocaleDateString("in-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return formattedDate;
    };

    fetch(`http://localhost:3000/users/${selectedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: selectedUser.id,
        nama: selectedUser.nama,
        alamat: selectedUser.alamat,
        jenisKelamin: selectedUser.jenisKelamin,
        tanggalLahir: formatDateTimeBorn(selectedUser.tanggalLahir),
        tanggalInput: formatDateTime(Date.now()),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateUser(selectedUser.id, data);
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  const handleDelete = (userInfo) => {
    setShowDeleteModal(true);
    setSelectedUser(userInfo);
  };

  const confirmDelete = () => {
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
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <Container>
        <Row className="py-5 mt-5">
          <AddUser />
        </Row>
        <Row>
          <Col>
            <Table hover responsive="sm">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Lahir</th>
                  <th>Tanggal Input</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {userData?.map((ele, index) => (
                  <tr key={ele.id}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{ele.nama}</td>
                    <td>{ele.alamat}</td>
                    <td>{ele.jenisKelamin}</td>
                    <td>{ele.tanggalLahir}</td>
                    <td>{ele.tanggalInput}</td>
                    <td>
                      <Row>
                        <Col>
                          <AiFillEye
                            onClick={() => handleView(ele)}
                            color="dodgerblue"
                            role="button"
                          />
                        </Col>
                        <Col>
                          <AiFillEdit
                            onClick={() => handleEdit(ele)}
                            color="dodgerblue"
                            role="button"
                          />
                        </Col>
                        <Col>
                          <AiFillDelete
                            onClick={() => handleDelete(ele)}
                            color="red"
                            role="button"
                          />
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {showViewModal && (
        <ModalComponent
          showModal={showViewModal}
          setShowModal={setShowViewModal}
          title="User Detail"
          confirmButtonText="OK"
          cancelButtonText="Cancel"
          content={
            <DetailComponent
              selecteduser={selectedUser}
              setselecteduser={setSelectedUser}
            />
          }
          showButton={false}
        />
      )}

      {showEditModal && (
        <ModalComponent
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          confirmAction={confirmUpdate}
          title="Edit User"
          content={
            <FormComponent
              selecteduser={selectedUser}
              setselecteduser={setSelectedUser}
            />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={
            selectedUser.name === "" || selectedUser.alamat === ""
          }
        />
      )}

      {showDeleteModal && (
        <ModalComponent
          showModal={showDeleteModal}
          setShowModal={setShowDeleteModal}
          confirmAction={confirmDelete}
          title="Delete User"
          content="Are you sure you want to delete this user ?"
          confirmButtonText="Confirm"
          cancelButtonText="Cancel"
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (data) => dispatch(fetchAllUsers(data)),
    updateUser: (id, data) => dispatch(updateUser(id, data)),
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
