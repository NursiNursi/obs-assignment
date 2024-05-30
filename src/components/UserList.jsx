import { Col, Container, Row, Table } from "react-bootstrap";

import { fetchAllUsers } from "../redux/actions/userActions";
import { useEffect } from "react";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import { connect } from "react-redux";

// eslint-disable-next-line react-refresh/only-export-components
function UserList({ userData, fetchAllUsers }) {
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => fetchAllUsers(data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Container>
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
                    <td className="fw-bold">{ele.name}</td>
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
                            // onClick={() => handleDelete(ele)}
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
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
