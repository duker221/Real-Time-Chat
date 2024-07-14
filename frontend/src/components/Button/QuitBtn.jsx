import React from "react";
import Button from "react-bootstrap/Button";
export const QuitBtn = () => {
  const handleClick = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Button type="submit" onClick={handleClick}>
      Выйти
    </Button>
  );
};
