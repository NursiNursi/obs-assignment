import { Form } from "react-bootstrap";

export default function NewUserFormComponent({ newUser, setnewUser }) {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Name"
            name="name"
            value={newUser.name}
            onChange={(e) => setnewUser({ ...newUser, name: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter your Address"
            name="address"
            value={newUser.address}
            onChange={(e) =>
              setnewUser({ ...newUser, address: e.target.value })
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
              checked={newUser.gender === "Male"}
              onChange={(e) =>
                setnewUser({
                  ...newUser,
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
              checked={newUser.gender === "Female"}
              onChange={(e) =>
                setnewUser({
                  ...newUser,
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
