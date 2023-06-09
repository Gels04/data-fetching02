"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'
import getAllUsers from '@/lib/getAllUsers'
import { ChangeEvent } from 'react'

export default async function Home() {

  const usersData: Promise<User[]> = getAllUsers()

  const users = await usersData;

  const content = users.map((user, id) => {
    return(
    <>
      <Link href={`/${user.id}`} key={id} style={{fontSize: "25px"}}>{user.name}</Link>
      <br />
    </>
    )
  })

  // function filter(e: ChangeEvent<HTMLInputElement>) {
  //   // console.log(e.target.value);
  //   const value = e.target.value.toLocaleLowerCase();
  //   users.forEach((user) => {
  //     const isVisible = user.name.toLocaleLowerCase().includes(value);
  //     if(isVisible) console.log(user);
  //   })
  // }

  return (
    <>
    <Link href={"/search"}>Search</Link>
    <br />
    {content}
    </>
    
  )
}
