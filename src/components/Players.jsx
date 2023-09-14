import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Players() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const getPlayers = async () => {
    let response;
    try {
      response = (await axios.get("http://localhost:3000/player/players")).data;
      setPlayers(response);
    } catch (e) {
      const error = e.response;
      console.log(error);
    }
  };
  useEffect(() => {
    getPlayers();
  }, []);

  const playerDetails = (id) => {
    navigate(`/player/${id}`)
  };

  return (
    <div>
      {players && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Player Name</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.player_id}>
                <th scope="row">{player.player_id}</th>
                <td>{player.player_name}</td>
                <td>{player.first_name}</td>
                <td>{player.last_name}</td>
                <td>
                  {" "}
                  <button
                    type="button"
                    onClick={() => playerDetails(player.player_id)}
                    className="btn btn-success"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Players;
