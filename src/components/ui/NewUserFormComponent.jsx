import { Form } from "react-bootstrap";

export default function NewUserFormComponent({ newUser, setnewUser }) {
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
}
