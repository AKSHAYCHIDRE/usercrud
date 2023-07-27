import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const history = useNavigate();

  const header = { "Allow-Control-Allow-Origin": "*" };

  const handleSubmit = (e) => {
    console.log("clicked");
    e.preventDefault();
    axios
      .post("https://64c20e10fa35860baea11c5b.mockapi.io/userlist", {
        name: name,
        email: email,
        header,
      })
      .then(() => {
        history("/read");
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of users</h2>
        <Link to="/read">
          <button type="submit" className="btn btn-outline-dark">
            View Users
          </button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
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
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
