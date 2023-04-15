import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import StandardChat from "./StandardChat"

const pageStyles = {
  color: "#232129",
  padding: 48,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        万物之中 希望之美
      </h1>
      <StandardChat></StandardChat>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
