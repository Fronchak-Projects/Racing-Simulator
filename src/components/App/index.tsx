import DriverType from "../../types/DriverType";
import Racing from "../Racing";

const driver1: DriverType = {
  id: 1,
  color: "#C14242",
  name: "Driver 1"
}

const driver2: DriverType = {
  id: 2,
  color: "#3F74BF",
  name: "Driver 2"
}

const driver3: DriverType = {
  id: 3,
  color: "#B83FBF",
  name: "Driver 3"
}

const driver4: DriverType = {
  id: 4,
  color: "#4C3FBF",
  name: "Driver 4"
}

const driver5: DriverType = {
  id: 5,
  color: "#68BF3F",
  name: "Driver 5"
}

const driver6: DriverType = {
  id: 6,
  color: "#E9986C",
  name: "Driver 6"
}

const driver7: DriverType = {
  id: 7,
  color: "#C14242",
  name: "Driver 7"
}

const driver8: DriverType = {
  id: 8,
  color: "#3F74BF",
  name: "Driver 8"
}

const driver9: DriverType = {
  id: 9,
  color: "#B83FBF",
  name: "Driver 9"
}

const driver10: DriverType = {
  id: 10,
  color: "#4C3FBF",
  name: "Driver 10"
}

const driver11: DriverType = {
  id: 11,
  color: "#68BF3F",
  name: "Driver 11"
}

const driver12: DriverType = {
  id: 12,
  color: "#E9986C",
  name: "Driver 12"
}

const App =() => {

  return (
    <div className="container-fluid py-4">
      <Racing 
        lapSize={13} 
        numberOfLaps={1} 
        drivers={[driver1, driver2, driver3, driver4, driver5, driver6,
                  driver7, driver8, driver9, driver10, driver11, driver12]} 
        systemPoints={[25, 18, 15, 12, 10, 8, 6, 4, 2, 1]}  
      />
    </div>
  );
}

export default App
