import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import SimpleChat from "../components/SimpleChat"

const pageStyles = {
  color: "#232129",
  padding: 24,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 16,
  maxWidth: 320,
  color: '#ffd740',
}

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        万物之中 希望至美
      </h1>
      <SimpleChat></SimpleChat>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Demo</title>
