import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
};

const url = "https://api.airtable.com/v0/app39xSNujiUrbaTR/Table%201";
const urlKey =
  "patEpEsxTz3CTwZIw.bc945ee535bb3b899ca5312e1fc695491b658d07e020efe888aff4a1ba4f518c";

export default function LoginPage() {
  const [userName, setUserName] = useState(initialState);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${urlKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: userName.name,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("User saved:", json);
      navigate("/home" /*,{ state: { name: userName.name } }*/);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (event) => {
    setUserName({ ...userName, [event.target.name]: event.target.value });
  };

  return (
    <>
      <h1>Start building your library.</h1>
      <h2>Tracking books made easy.</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <b>Name:</b>
        </label>
        <br />
        <input
          id="Name"
          name="Name"
          type="text"
          value={userName.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Join</button>
      </form>
    </>
  );
}
