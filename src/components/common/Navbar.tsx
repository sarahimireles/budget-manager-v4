import React from "react"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/accounts">Accounts</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar