import { Link } from "react-router-dom";

function MobileNav() {
  return (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/bookings">Buchungen</Link>
      </li>
      <li>
        <Link to="/cabins">Zimmer</Link>
      </li>
      <li>
        <Link to="/schedular">Buchungskalender</Link>
      </li>
      <li>
        <Link to="/settings">Einstellungen</Link>
      </li>
    </ul>
  );
}

export default MobileNav;
