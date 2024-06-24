import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import axios from "axios";
import { useSelector } from "react-redux";
const Chat = () => {
  const [channels, setChannels] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get("/api/v1/channels", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChannels(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    if (token) {
      fetchChannels();
    }
  }, [token]);

  return (
    <>
      <Navigation />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button
                type="button"
                className="p-0 text-primary btn btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
              {channels.map((channel) => ( 
                <li key={channel.id} className="nav-item w-100">
                    <button type="button" className="w-100 rounded-0 text-start btn btn-secondary"><span className="me-1">#</span>{channel.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col p-0 h-100">
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
