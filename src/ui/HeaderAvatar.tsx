import React from "react";

function HeaderAvatar() {
  return (
    <div className="flex mr-10">
      <img
        className="w-10 rounded-full mr-2"
        src="avatar.jpeg"
        alt="Avatar des Nutzers"
      />
      <span className="flex justify-center items-center">
        Bronko Fladenbrot
      </span>
    </div>
  );
}

export default HeaderAvatar;
