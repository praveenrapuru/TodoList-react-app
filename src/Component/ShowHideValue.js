import { useState } from "react";
import Tasks from "./Tasks";
import 'bootstrap/dist/css/bootstrap.min.css';

function ShowHideValue()  {
  const [buttonVisible, setButtonVisible] = useState(true);

  const handleClick = () => {
    setButtonVisible(false);
  };

  return (
    <div style={{textAlign:"center"}}>
      {buttonVisible ? (
        <button className="btn btn-primary" onClick={handleClick}>Add Task</button>
      ) : (
        <div><Tasks/></div>
      )}
    </div>
  );
};

export default ShowHideValue;
