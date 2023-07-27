import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [data, setData] = useState([]);
  const [tableDark, setTableDark] = useState("");
  const [inputText, setInputText] = useState("");

  function getData() {
    axios
      .get("https://64c20e10fa35860baea11c5b.mockapi.io/userlist")
      .then((res) => {
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`https://64c20e10fa35860baea11c5b.mockapi.io/userlist/${id}`)
      .then(() => {
        getData();
      });
  }

  function setToLoacalStorage(id, name, email) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }

  useEffect(() => {
    getData();
  }, []);

  function inputHandler(e) {
    setInputText(e.target.value?.toLowerCase());
  }

  return (
    <>
      <div className="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          onClick={() => {
            setTableDark(tableDark === "table-dark" ? "" : "table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of users</h2>
        <Link to="/">
          <button type="submit" className="btn btn-outline-dark">
            Create User
          </button>
        </Link>
      </div>
      <div className="col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search Here..."
          onChange={inputHandler}
        />
      </div>
      <table className={`table p-3 my-3 ${tableDark}`}>
        <thead>
          <tr>
            <th className="p-3" scope="col">
              #
            </th>
            <th className="p-3" scope="col">
              Name
            </th>
            <th className="p-3" scope="col">
              Email
            </th>
            <th className="p-3" scope="col"></th>
            <th className="p-3" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((el) => {
              if (el === "") {
                return <h2>No Result Found</h2>;
              } else {
                return (
                  el.name?.toLowerCase().includes(inputText) ||
                  el.email?.toLowerCase().includes(inputText)
                );
              }
            })
            .map((user) => (
              <>
                <tr>
                  <th className="p-3" scope="row" key={user.id}>
                    {user.id}
                  </th>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <Link to="/update">
                      <button
                        type="button"
                        onClick={() =>
                          setToLoacalStorage(user.id, user.name, user.email)
                        }
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default Read;
