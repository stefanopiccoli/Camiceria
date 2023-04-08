import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Link to="/su-misura">
        <img
          src="https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
          alt=""
          className="h-screen object-cover"
        />
      </Link>
    </>
  );
}
