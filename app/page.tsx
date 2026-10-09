import Link from "next/link"
import ZoomableImage from "@/components/zoomable-image"

const puzzles = [
  { href: "/puzzles/2012", year: "2012" },
  { href: "/puzzles/2013", year: "2013" },
  { href: "/puzzles/2014", year: "2014" },
  { href: "/puzzles/post-cicada", year: "POST-2014" },
]

export default function Page() {
  return (
    <main className="landing-page">
      <ZoomableImage
        className="landing-logo"
        src="https://i.kym-cdn.com/entries/icons/original/000/014/610/maxresdefault.jpg"
        alt="Emblema de Cicada 3301"
      />
      <nav className="puzzle-menu" aria-label="Archivo de acertijos de Cicada 3301">
        {puzzles.map((puzzle) => (
          <Link className="puzzle-link" href={puzzle.href} key={puzzle.href}>
            <span className="puzzle-link-year">{puzzle.year}</span>
          </Link>
        ))}
      </nav>
    </main>
  )
}
