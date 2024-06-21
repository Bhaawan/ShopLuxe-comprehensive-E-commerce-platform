import NavBar from "../features/navbar/Navbar.js";
import ProductList from "../features/product list/components/ProductList.js";


function Home() {
    return ( 
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
        </div>
    );
}

export default Home;