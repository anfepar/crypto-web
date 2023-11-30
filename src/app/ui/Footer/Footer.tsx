import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center text-slate-500 text-sm my-10">
      <Link href="https://github.com/anfepar" target="_blank">
        {"Made with ❤️ by Felipe Pardo © 2023"}
      </Link>
    </footer>
  )
}