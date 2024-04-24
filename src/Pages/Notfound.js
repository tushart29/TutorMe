import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            <h2>Page not found!</h2>
            {/* dont need navlink when active  */}
            <p>Go to the <Link to="/">Home</Link>.</p>
        </div>
    )
} 