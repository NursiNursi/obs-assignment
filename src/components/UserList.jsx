import { useEffect, useState } from "react";
import {
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "../redux/actions/userActions";
import { connect } from "react-redux";

import {
  Button,
  Col,
  Container,
  Placeholder,
  Row,
  Table,
} from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";

import AddUser from "./AddUser";
import ModalComponent from "./ui/ModalComponent";
import FormComponent from "./ui/FormComponent";
import DetailComponent from "./ui/DetailComponent";

import { fetchUserImage } from "../service/api";
import { formatDateTime } from "../util/formatDateTime";

function UserList({ userData, fetchAllUsers, deleteUser, updateUser }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const getAllUsers = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => {
        fetchAllUsers(data);
        setIsLoading(false);
      })
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
        toast.success("User successfully deleted");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    getAllUsers();
    fetchUserImage(setImageUrl);
  }, []);

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
                  <th>Name</th>
                  <th>Address</th>
                  <th>Gender</th>
                  <th>Input Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData?.map((ele, index) => (
                  <tr key={ele.id}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">
                      <img
                        src={imageUrl}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "8px",
                          borderRadius: "15px",
                        }}
                      />
                      <span>{ele.name}</span>
                    </td>
                    <td>{ele.address}</td>
                    <td>{ele.gender}</td>
                    <td>{ele.inputDate}</td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <div>
                          <Button onClick={() => handleView(ele)}>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiOutlineEye
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              View
                            </div>
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleEdit(ele)}
                            variant="outline-primary"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiFillEdit
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              Edit
                            </div>
                          </Button>
                        </div>
                        <div>
                          <Button
                            onClick={() => handleDelete(ele)}
                            variant="outline-danger"
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <AiFillDelete
                                size={20}
                                style={{ marginRight: "5px" }}
                              />
                              Delete
                            </div>
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {isLoading && (
              <Placeholder animation="glow">
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
                <Placeholder xs={12} size="lg" />
              </Placeholder>
            )}
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
            <DetailComponent selecteduser={selectedUser} imageUrl={imageUrl} />
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
            selectedUser.name === "" || selectedUser.address === ""
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
