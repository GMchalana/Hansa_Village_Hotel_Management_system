import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CustomerHome from './Components/Customer/Home';
import CustomerOrders from './Components/Customer/Orders';
import CustomerBooking from './Components/Customer/Booking';
import CustomerDetails from './Components/Owner/Customer_details';
import Inventory from './Components/Owner/Inventory';
import InventoryDetails from './Components/Inventory_manager/Inventory_details';
import PurchaseInventory from './Components/Inventory_manager/Purchase_inventory';
import UsedInventory from './Components/Inventory_manager/Used_inventory';
import Available_orders from './Components/Kitchen_Manager/Available_orders';
import AddMeal from './Components/Kitchen_Manager/Add_meal';
import Reservationmanager from './Components/Reservation_manager/Reservation_manager';
import ReservationmanagerAddhall from './Components/Reservation_manager/Add_hall';
import App1 from './Components/Inventory_manager/App1';
import Signupravin from './Components/Signupravin';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/CustomerHome" element={<CustomerHome />} />
            <Route path="/CustomerOrders" element={<CustomerOrders />} />
            <Route path="/CustomerBooking" element={<CustomerBooking />} />
            <Route path="/Owner/CustomerDetails" element={<CustomerDetails />} />
            <Route path="/Owner/Inventory" element={<Inventory/>}/>
            <Route path="/InventoryManager/InventoryDetails" element={<InventoryDetails/>}/>
            <Route path="/InventoryManager/PurchaseInventory" element={<PurchaseInventory/>}/>
            <Route path="/InventoryManager/UsedInventory" element={<UsedInventory/>}/>
            <Route path="/KitchenManager/AvailableOrders" element={<Available_orders/>}/>
            <Route path="/KitchenManager/AddMeal" element={<AddMeal/>}/>
            <Route path="/ReservationManager/Reservations" element={<Reservationmanager/>}/>
            <Route path="/ReservationManager/Addhall" element={<ReservationmanagerAddhall/>}/>
            <Route path="/App1" element={<App1/>}/>
            <Route path="/Signupravin" element={<Signupravin/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
