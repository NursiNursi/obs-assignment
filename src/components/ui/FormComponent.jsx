import { Form } from "react-bootstrap";

export default function FormComponent({ selecteduser, setselecteduser }) {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={selecteduser.nama}
            onChange={(e) =>
              setselecteduser({ ...selecteduser, nama: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Alamat</Form.Label>
          <Form.Control
            type="alamat"
            placeholder="alamat"
            name="alamat"
            value={selecteduser.alamat}
            onChange={(e) =>
              setselecteduser({ ...selecteduser, alamat: e.target.value })
            }
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
              checked={selecteduser.jenisKelamin === "Pria"}
              onChange={(e) =>
                setselecteduser({
                  ...selecteduser,
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
              checked={selecteduser.jenisKelamin === "Wanita"}
              onChange={(e) =>
                setselecteduser({
                  ...selecteduser,
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
            value={selecteduser.tanggalLahir}
            onChange={(e) =>
              setselecteduser({
                ...selecteduser,
                tanggalLahir: e.target.value,
              })
            }
          />
        </Form.Group>
      </Form>
    </div>
  );
}
