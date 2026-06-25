import { Download } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Named = {
  name?: string
  nameEn?: string
  description?: string
}

export type SongResult = {
  title: string
  slug: string
  description?: string | null
  music?: string | null
  words?: string | null
  publishedAt?: string | null
  contributors?: Named[]
  languages?: Named[]
  tags?: Named[]
}

export function names(
  items: Named[] | undefined,
  field: "name" | "nameEn" = "name",
) {
  return (items || [])
    .map((item) => item[field])
    .filter(Boolean)
    .join(", ")
}

export function formatDate(value?: string | null) {
  if (!value) return ""
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value))
}

function SongMeta({ song }: { song: SongResult }) {
  return (
    <>
      <div className="mt-1 text-sm text-slate-700">
        {names(song.contributors) || song.music || song.description}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {(song.languages || []).slice(0, 3).map((language) =>
          language.nameEn ? (
            <Badge key={language.nameEn} variant="secondary">
              {language.nameEn}
            </Badge>
          ) : null,
        )}
        {(song.tags || []).slice(0, 3).map((tag) =>
          tag.name ? (
            <Badge key={tag.name} variant="outline">
              {tag.name}
            </Badge>
          ) : null,
        )}
      </div>
    </>
  )
}

function PdfButton({ song }: { song: SongResult }) {
  return (
    <Button asChild variant="ghost" size="icon">
      <a
        href={`https://www.bahaisongproject.com/${song.slug}.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${song.title} PDF`}
      >
        <Download aria-hidden="true" />
      </a>
    </Button>
  )
}

export default function SongResultsList({
  songs,
  controls,
  footer,
  empty,
  showPublished = true,
}: {
  songs: SongResult[]
  controls?: React.ReactNode
  footer?: React.ReactNode
  empty?: React.ReactNode
  showPublished?: boolean
}) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground">
      {controls}

      {songs.length === 0 ? (
        empty
      ) : (
        <>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Song</TableHead>
                  {showPublished && <TableHead>Published</TableHead>}
                  <TableHead className="w-20 text-right">PDF</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {songs.map((song) => (
                  <TableRow key={song.slug}>
                    <TableCell>
                      <a
                        className="font-medium text-slate-950 hover:text-primary-700"
                        href={`/${song.slug}`}
                      >
                        {song.title}
                      </a>
                      <SongMeta song={song} />
                    </TableCell>
                    {showPublished && (
                      <TableCell className="whitespace-nowrap text-slate-700">
                        {formatDate(song.publishedAt)}
                      </TableCell>
                    )}
                    <TableCell className="text-right">
                      <PdfButton song={song} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="divide-y md:hidden">
            {songs.map((song) => (
              <article key={song.slug} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <a
                      className="font-medium text-slate-950 hover:text-primary-700"
                      href={`/${song.slug}`}
                    >
                      {song.title}
                    </a>
                    <div className="mt-1 text-sm leading-5 text-slate-700">
                      {names(song.contributors) ||
                        song.music ||
                        song.description}
                    </div>
                  </div>
                  <PdfButton song={song} />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(song.languages || []).slice(0, 3).map((language) =>
                    language.nameEn ? (
                      <Badge key={language.nameEn} variant="secondary">
                        {language.nameEn}
                      </Badge>
                    ) : null,
                  )}
                  {(song.tags || []).slice(0, 3).map((tag) =>
                    tag.name ? (
                      <Badge key={tag.name} variant="outline">
                        {tag.name}
                      </Badge>
                    ) : null,
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {footer}
    </div>
  )
}
