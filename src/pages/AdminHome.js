import AdminProductList from "../features/admin/components/AdminProductList.js";
import NavBar from "../features/navbar/Navbar.js";


function AdminHome() {
    return ( 
        <div>
            <NavBar>
                <AdminProductList></AdminProductList>
            </NavBar>
        </div>
    );
}

export default AdminHome;