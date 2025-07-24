/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { useEffect } from "react";
import socket from "../socket";

useEffect(() => {
  socket.on("statusUpdate", (data) => {
    if (data.parcelId === parcelId) {
      alert(`Parcel status changed to: ${data.status}`);
      setParcel(prev => ({ ...prev, status: data.status }));
    }
  });

  return () => {
    socket.off("statusUpdate");
  };
}, []);
