import Link from "next/link"
import { notFound } from "next/navigation"
import ZoomableImage from "@/components/zoomable-image"
import { sections, wiki } from "@/lib/cicada-data"

const puzzleSlugs = ["2012", "2013", "2014", "post-cicada"]

export function generateStaticParams() {
  return puzzleSlugs.map((slug) => ({ slug }))
}

export default async function PuzzlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let section = sections.find((item) => item.id === slug)

  if (slug === "post-cicada") section = sections.find((item) => item.id === "after")
  if (!section) notFound()

  const sourcePage = section.id === "2012"
      ? "What_Happened_(2012)"
      : section.id === "2013"
        ? "What_Happened_Part_2_(2013)"
        : section.id === "2014"
          ? "What_Happened_Part_1_(2014)"
          : "What_Happened_Liber_Primus_(Post_2014)"

  return (
    <main className="archive-shell puzzle-page">
      <div className="puzzle-page-inner">
        <Link className="back-link" href="/">&lt; VOLVER AL ARCHIVO</Link>
        <section className={`year-card year-card-${section.id} puzzle-detail`} aria-labelledby="puzzle-title">
          <div className="year-art-wrap">
            {section.image && <ZoomableImage className={`year-art ${section.imageClass}`} src={section.image} alt={section.imageAlt} />}
            {section.gallery?.length > 0 && (
              <div className={`year-image-gallery ${section.id === "2012" ? "year-gallery-duck" : `year-gallery-${section.id}`}`} aria-label="Imágenes del acertijo">
                {section.gallery.map((image) => <ZoomableImage key={image.src} src={image.src} alt={image.alt} />)}
              </div>
            )}
            <span className="year-art-label">CICADA // {section.id === "after" ? "POST" : section.id}</span>
          </div>
          <div className="year-content">
            <div className="year-heading">
              <span className="year-number">{section.number}</span>
              <div>
                <p className="eyebrow">{section.subtitle}</p>
                <h1 id="puzzle-title">{section.title}</h1>
              </div>
            </div>
            <ol className="event-list">
              {section.entries.map(([date, text], index) => (
                <li key={date}>
                  <div className="event-meta">
                    <span className="event-order">{String(index + 1).padStart(2, "0")}</span>
                    <span className="event-date">{date}</span>
                  </div>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <a className="source-link" href={`${wiki}/${sourcePage}`} target="_blank" rel="noreferrer">
              Abrir fuente en Uncovering Cicada Wiki
            </a>
            <div className="detail-related-sources">
              {section.related.map((source) => (
                <a className="source-link" href={source.href} target="_blank" rel="noreferrer" key={source.href}>
                  {source.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
