"use client"

import Link from "next/link"
import { FormEvent, useMemo, useRef, useState } from "react"

export default function Search() {

    

    const [users, setUsers] = useState(["Martin", "Felix", "Maddie", "Peppa"]);
    const [query, setQuery] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)

    // filters list of users
    // useMemo - only rerender this code when the `users` and `query` state changes - this ensures function still works despite large amounts of data
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            return user.toLowerCase().includes(query.toLowerCase())
         })
    }, [users, query])

    function onSubmit(e:FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const value = inputRef.current?.value

        if(value == null || value == "") return

        setUsers(prev => {
            return [...prev, value]; //this adds new user to the user list
        })

        inputRef.current!.value = ""
    }

  return (
    <>
    <Link href={"/"}>Back</Link>
    <br />
    <br />
    <form onSubmit={onSubmit}>
        <label htmlFor="search">Search Bar
            {/* every time value is typed, query is set to value */}
            <input value={query} onChange={e => setQuery(e.target.value)} type="text" id="search"/>
        </label>
        <br />
        <br />
        <label htmlFor="add">Add User
            <input type="text" ref={inputRef} id="add"/>
        </label>
        <button type="submit">Add</button>
        <br />
        <br />
    </form>

    <h3>Filtered Users</h3>
    {filteredUsers.map((user, id) => (
        <div key={id}>{user}</div>
    ))}
    </>

  )
}
