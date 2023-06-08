import Link from "next/link";
import getUser from "@/lib/getUser";

type Params = {
  params: {
    userId: string;
  }
}

export default async function UserPage({params: {userId}}: Params) {

  const userData: Promise<User> = getUser(userId);
  const user = await userData

  const content = (
    <section>
      <button><Link href={"/"}>Back</Link></button>
      <br />
      <h1>{user.name}</h1>
      <br />
      <h2>Username: {user.username}</h2>
      <br />
      <h2>Email: {user.email}</h2>


    </section>
  )

  return content
}
