import { Col, Container, Row, Table } from "react-bootstrap";

import { deleteUser, fetchAllUsers } from "../redux/actions/userActions";
import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { connect } from "react-redux";
import AddUser from "./AddUser";
import ModalComponent from "./ui/ModalComponent";

// eslint-disable-next-line react-refresh/only-export-components
function UserList({ userData, fetchAllUsers, deleteUser }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
                            // onClick={() => handleView(ele)}
                            color="dodgerblue"
                            role="button"
                          />
                        </Col>
                        <Col>
                          <AiFillEdit
                            // onClick={() => handleEdit(ele)}
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
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
