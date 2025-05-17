import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { to: "/", label: "Home" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
    ];

    const isActive = (path: string) =>
        location.pathname === path ||
        (path !== "/" && location.pathname.startsWith(path));

    return (
        <nav className="bg-white shadow-lg px-8 py-4 flex items-center justify-between relative z-10">


            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex space-x-10 text-gray-700 font-medium text-lg">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`relative transition-all duration-300 px-3 py-2 rounded-md 
                                ${
                                isActive(item.to)
                                    ? "text-blue-700 font-bold underline underline-offset-4"
                                    : "hover:text-blue-600 hover:bg-blue-50"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg shadow hover:brightness-110 transition duration-300"
                >
                    Dashboard
                </button>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow hover:brightness-110 transition duration-300"
                >
                    Login
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
