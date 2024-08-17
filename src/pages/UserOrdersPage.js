import NavBar from "../features/navbar/Navbar.js";
import UserOrders from "../features/user/components/UserOrders.js";

function ProductDetailsPage() {
    return ( 
        <NavBar>
            <div className="text-3xl font-semibold mb-8"><h1>My Orders</h1></div>
            
            <UserOrders></UserOrders>
        </NavBar>
    );
}

export default ProductDetailsPage;