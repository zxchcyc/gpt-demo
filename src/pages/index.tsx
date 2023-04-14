import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import ChatPage from "./chat"

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
        试试 ChatGPT
      </h1>
      <ChatPage></ChatPage>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
