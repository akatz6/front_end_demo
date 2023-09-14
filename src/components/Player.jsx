import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function Player() {
  const login = Cookies.get("loggedIn");
  const location = useParams();
  const [player, setPlayer] = useState({});
  let response;
  const getPlayer = async () => {
    try {
      response = await axios.get(
        `http://localhost:3000/player/player/${location.id}`
      );
      setPlayer(response.data[0]);
    } catch (e) {
      const error = e.response;
      console.log(error);
    }
  };

  const onChange = (e) => {
    if (login) {
      setPlayer((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  useEffect(() => {
    getPlayer();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const updatePlayer = Object.fromEntries(data);
    try {
      await axios.put(
        `http://localhost:3000/player/player/${location.id}`,
        updatePlayer,
        {
          headers: {
            authorization: login,
          },
        }
      );
    } catch (e) {
      const error = e.response;
      console.log(error);
    }
  };
  return (
    <div className="registerForm">
      {player && (
        <>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Player Name</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                value={player.player_name || ""}
                onChange={onChange}
                name="player_name"
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={player.first_name || ""}
                onChange={onChange}
                name="first_name"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={player.last_name || ""}
                onChange={onChange}
                name="last_name"
              />
            </div>
            {login && (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </form>
        </>
      )}
    </div>
  );
}

export default Player;
