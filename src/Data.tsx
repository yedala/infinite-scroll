import { useEffect, useState, useRef } from "react";

export default function User() {
  const [users, setUsers] = useState([]);
  const sentinalObj = useRef(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  useEffect(() => {
    let observer = new IntersectionObserver(handleInfinite, options);
    observer.observe(sentinalObj.current);
  }, []);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    console.log(users, data.users);
    setUsers((prev) => [...prev, ...data.users]);
  };
  const handleInfinite = (entries: any) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchUsers();
      }
    });
  };
  return (
    <div className="container">
      {users.map((u, i) => {
        return (
          <div className="user" key={i}>
            {u.firstName}:{" "}
          </div>
        );
      })}
      <div ref={sentinalObj}></div>
    </div>
  );
}
