import { Form } from "react-bootstrap";

export default function FormComponent({ selecteduser, setselecteduser }) {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={selecteduser.name}
            onChange={(e) =>
              setselecteduser({ ...selecteduser, name: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="address"
            name="address"
            value={selecteduser.address}
            onChange={(e) =>
              setselecteduser({ ...selecteduser, address: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              id="male"
              name="gender"
              value="Male"
              label="Male"
              checked={selecteduser.gender === "Male"}
              onChange={(e) =>
                setselecteduser({
                  ...selecteduser,
                  gender: e.target.value,
                })
              }
            />
            <Form.Check
              type="radio"
              id="female"
              name="gender"
              value="Female"
              label="Female"
              checked={selecteduser.gender === "Female"}
              onChange={(e) =>
                setselecteduser({
                  ...selecteduser,
                  gender: e.target.value,
                })
              }
            />
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
