import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import ModalComponent from "./ui/ModalComponent";
import { connect } from "react-redux";
import { addUser } from "../redux/actions/userActions";

const initialUserData = {
  nama: "",
  alamat: "",
  jenisKelamin: "Pria",
  tanggalLahir: "",
  tanggalInput: "",
};

const AddUser = ({ userData, addUser }) => {
  const [newUser, setnewUser] = useState(initialUserData);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const confirmAdd = () => {
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

    // Example usage:
    const timestamp = Date.now(); // Replace with your actual timestamp
    const formattedOutput = formatDateTime(timestamp);
    console.log(formattedOutput); // Output: "30 Mei 2024 09:46"

    fetch(`http://localhost:3000/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nama: newUser.nama,
        alamat: newUser.alamat,
        jenisKelamin: newUser.jenisKelamin,
        tanggalLahir: formatDateTimeBorn(newUser.tanggalLahir),
        tanggalInput: formatDateTime(Date.now()),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        addUser(data);
        setShowAddModal(false);
        setnewUser(initialUserData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  return (
    <>
      <Col>
        <Button variant="outline-primary" className="pe-none">
          All Users{" "}
          <span className="badge bg-secondary">{userData.length}</span>
        </Button>
      </Col>
      <Col className="text-end">
        <Button variant="primary" onClick={handleAdd}>
          Add user
        </Button>
      </Col>

      {showAddModal && (
        <ModalComponent
          showModal={showAddModal}
          setShowModal={setShowAddModal}
          confirmAction={confirmAdd}
          title="Add new user"
          content={
            <NewUserFormComponent newUser={newUser} setnewUser={setnewUser} />
          }
          confirmButtonText="Update"
          cancelButtonText="Cancel"
          isConfirmDisabled={newUser.nama === "" || newUser.alamat === ""}
        />
      )}
    </>
  );
};

const NewUserFormComponent = ({ newUser, setnewUser }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="nama"
            name="nama"
            value={newUser.nama}
            onChange={(e) => setnewUser({ ...newUser, nama: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            type="alamat"
            placeholder="alamat"
            name="alamat"
            value={newUser.alamat}
            onChange={(e) => setnewUser({ ...newUser, alamat: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Jenis Kelamin</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="pria"
              name="jenisKelamin"
              value="Pria"
              label="Pria"
              checked={newUser.jenisKelamin === "Pria"}
              onChange={(e) =>
                setnewUser({
                  ...newUser,
                  jenisKelamin: e.target.value,
                })
              }
            />
            <Form.Check
              type="radio"
              id="wanita"
              name="jenisKelamin"
              value="Wanita"
              label="Wanita"
              checked={newUser.jenisKelamin === "Wanita"}
              onChange={(e) =>
                setnewUser({
                  ...newUser,
                  jenisKelamin: e.target.value,
                })
              }
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tanggal Lahir</Form.Label>
          <Form.Control
            type="date"
            name="tanggalLahir"
            value={newUser.tanggalLahir}
            onChange={(e) =>
              setnewUser({
                ...newUser,
                tanggalLahir: e.target.value,
              })
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.user.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(addUser(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
