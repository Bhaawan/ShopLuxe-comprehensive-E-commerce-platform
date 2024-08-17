import NavBar from "../features/navbar/Navbar.js";
import UserProfile from "../features/user/components/UserProfile.js";

function UserOrdersPage() {
    return ( 
        <NavBar>
            <div className="text-3xl font-semibold mb-8"><h1>My Account</h1></div>
            
            <UserProfile></UserProfile>
        </NavBar>
    );
}

export default UserOrdersPage;