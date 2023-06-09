"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import getAllUsers from '@/lib/getAllUsers'
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'

//cannot have an async component in react/next. If you want to fetch asynchronous data, must put that in an async function - see useEffect(), line 19
export default function Home() {

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("")

  const nameInputRef = useRef<HTMLInputElement>(null);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    async function fetchData() {
      const usersData: Promise<User[]> = getAllUsers()
      const users = await usersData;
      setAllUsers(users);
    }

    fetchData()
  }, [])

// when a user submits, it adds another user to the list - only adds the user if all fields have been provided
  function onSubmit(e: FormEvent<HTMLFormElement>) {

    e.preventDefault();

    const value: User = {
      name: nameInputRef.current!.value,
      username: userNameInputRef.current!.value,
      email: emailInputRef.current!.value,
    }

    setAllUsers((prev) => {
      return [...prev, value]
    })

    nameInputRef.current!.value = ""
    userNameInputRef.current!.value = ""
    emailInputRef.current!.value = ""
    
  }

    // filters list of users
    // useMemo - only rerender this code when the `users` and `query` state changes - this ensures function still works despite large amounts of data
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      return user.name.toLowerCase().includes(query.toLowerCase());
  })}, [allUsers, query])


  const content = filteredUsers.map((user) => {
    
    return (
      <>
      <h3><Link href={`/${user.id}`}>{user.name}</Link></h3>
      <br />
      </>
    )
  })

  const searchBar = (

    <>
      <label htmlFor="search"> Search
      <input type="text" id="search" value={query} onChange={(e) => setQuery(e.target.value)}/>
      </label>
    </>

  )


  const form = (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name
        <input required ref={nameInputRef} type="text" id='name'/>
        <br />
      </label>Username
      <label htmlFor="username">
        <input required ref={userNameInputRef} type="text" id='username'/>
        <br />
      </label>Email
      <label htmlFor="email">
        <input required ref={emailInputRef} type="text" id='email' />
      </label>
      <br />
      <button type='submit'>Add</button>
    </form>
  )


  return (

    <>
    {searchBar}
    <br />
    <br />
    <br />
    {form}
    <br />
    {content}
    </>
  )
}
