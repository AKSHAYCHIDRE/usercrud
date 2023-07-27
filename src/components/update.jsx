import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Update() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const history = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://64c20e10fa35860baea11c5b.mockapi.io/userlist/${id}`, {
        name: name,
        email: email,
      })
      .then(() => {
        history("/read");
      });
  };

  return (
    <div>
      <h1>User Update</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Link to="/read">
          <button type="submit" className="btn btn-secondary me-3">
            Back
          </button>
        </Link>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
