import { Form, Image } from "react-bootstrap";

export default function DetailComponent({ selecteduser, imageUrl }) {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3 text-center">
          <Image
            src={imageUrl}
            roundedCircle
            style={{ width: "200px", height: "200px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            value={selecteduser.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="address"
            name="address"
            value={selecteduser.address}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            id="pria"
            name="gender"
            value={selecteduser.gender}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
