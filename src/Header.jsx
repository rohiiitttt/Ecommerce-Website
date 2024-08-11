

function Header(){
    return (
        <header className="flex items-center h-16 justify-between px-4">
            <img className="p-2 w-28" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon logo" />
            <nav>
                <ul className="flex m-3 space-x-6">
                    <li>
                        <a href="" className="text-gray-800 hover:text-blue-600 focus:text-blue-600">Home</a>
                    </li>
                    <li>
                        <a href="" className="text-gray-800 hover:text-blue-600 focus:text-blue-600">Services</a>
                    </li>
                    <li>
                        <a href="" className="text-gray-800 hover:text-blue-600 focus:text-blue-600">Contact Us</a>
                    </li>
                    <li>
                        <a href="" className="text-gray-800 hover:text-blue-600 focus:text-blue-600">About Us</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
