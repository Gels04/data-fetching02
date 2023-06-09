"use client"
import { FormEvent, useMemo, useRef, useState, useEffect } from "react";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

//cannot have an async component. If you want to fetch asynchronous data, must put that in an async function - see useEffect(), line 15
export default function Search() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };

    fetchData();
  }, []);

//   
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return user.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [users, query]);

//   only adds the user if all fields have been provided

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value: User = {
      name: nameInputRef.current!.value,
      username: userNameInputRef.current!.value,
      email: emailInputRef.current!.value,
    };

    if (value.name === "" || value.username === "" || value.email === "") {
      return;
    }

    setUsers((prev) => {
      return [...prev, value];
    });

    nameInputRef.current!.value = "";
    userNameInputRef.current!.value = "";
    emailInputRef.current!.value = "";
  }

  return (
    <>
      <Link href={"/"}>Back</Link>
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <label htmlFor="search">
          Search Bar
          {/* every time value is typed, query is set to value */}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            id="search"
          />
        </label>
        <br />
        <br />
        <h3>Add User</h3>
        <label htmlFor="name">
          Name
          <input type="text" ref={nameInputRef} id="name" />
        </label>
        <label htmlFor="userName">
          UserName
          <input type="text" ref={userNameInputRef} id="userName" />
        </label>
        <label htmlFor="email">
          Email
          <input type="text" ref={emailInputRef} id="email" />
        </label>
        <button type="submit">Add</button>
        <br />
        <br />
      </form>

{/* mapping through users array */}
      <h3>Filtered Users</h3>
      {filteredUsers.map((user, id) => (
        <div key={id}>{user.name}</div>
      ))}
    </>
  );
}
