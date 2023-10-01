import React from "react";

const Notification = ({ isShowNotification }) => {
  return (
    <div className={`notification-container ${isShowNotification ? "show" : ""}`}>
      <p>You have already entered this letter</p>
    </div>
  );
};

export default Notification;
