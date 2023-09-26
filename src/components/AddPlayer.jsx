import { useState, useEffect } from "react";
import { Buffer } from "buffer";
import Cookies from "js-cookie";
import axios from "axios";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
window.Buffer = window.Buffer || Buffer;

function AddPlayer() {
  const login = Cookies.get("loggedIn");
  const [selectFile, setSelectFile] = useState(null);
  const [imageName, setImageName] = useState(null);

  const handleUpload = async () => {
    const params = {
      Bucket: "aaron-katz-demo-images",
      Key: imageName,
      Body: selectFile,
    };

    const client = new S3Client({
      region: "us-east-2",
      credentials: {
        accessKeyId: import.meta.env.VITE_APP_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_APP_SECRET_ACCESS_KEY,
      },
    });

    try {
      const command = new PutObjectCommand(params);
      const response = await client.send(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const registerData = Object.fromEntries(data);
    if (registerData["img"]) {
      handleUpload();
      registerData[
        "img"
      ] = `https://aaron-katz-demo-images.s3.us-east-2.amazonaws.com/${imageName}`;
    }
    console.log(registerData);
    try {
      await axios.post(`http://localhost:3000/player/players`, registerData, {
        headers: {
          authorization: `Bearer ${login}`,
        },
      });
    } catch (e) {
      const error = e.response;
      console.log(error);
    }
  };

  const change = (e) => {
    setImageName(e.target.files[0].name);
    setSelectFile(e.target.files[0]);
  };

  return (
    <>
      <div className="registerForm">
        <form onSubmit={submit}>
          <div className="form-group">
            <label>Player Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Player Name"
              name="player_name"
              required
            />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              name="first_name"
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              name="last_name"
              required
            />
          </div>
          <div className="form-group">
            <label>Enter Picture of Player</label>
            <br />
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              accept="image/png, image/gif, image/jpeg"
              name="img"
              onChange={change}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddPlayer;
