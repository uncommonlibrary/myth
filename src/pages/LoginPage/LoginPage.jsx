import { useState } from "react";
import { useNavigate } from "react-router-dom";

const url = "https://api.airtable.com/v0/app39xSNujiUrbaTR/Table%201";
const urlKey = `${import.meta.env.VITE_APIKEY}`;

export default function LoginPage() {
  const [userName, setUserName] = useState({ name: "" });
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
            name: userName.name,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("User saved:", json);
      navigate("/home", { state: { name: userName.name } });
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
          name="name"
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
