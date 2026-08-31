import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return <h2 className="flex justify-center my-10">No Connections found</h2>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 bg-base-300 w-1/2 rounded-lg mx-auto"
          >
            <div>
              {" "}
              <img
                alt="photo"
                className="w-20 h-20 rounded-b-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-lg">
                {" "}
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
