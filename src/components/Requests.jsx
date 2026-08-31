import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return <h2 className="flex justify-center my-10">No Requests Found</h2>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 bg-base-300 w-2/3 rounded-lg mx-auto"
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
            <div className="flex">
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequests("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequests("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
