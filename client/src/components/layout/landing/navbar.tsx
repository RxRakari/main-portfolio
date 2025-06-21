import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold">Monochrome Portfolio</div>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/blogs" className="hover:underline">Blogs</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </ul>
        </nav>
    )
}
