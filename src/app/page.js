import Link from "next/link";
export default function Home() {
  return (
    <Link href="/todo" className="underline underline-offset-2">Go to Todos page</Link>
  )
}
