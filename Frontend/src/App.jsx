import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [ code, setCode ] = useState(` //Write some Code Here : 

    function sum( a, b) {
    return 1 + 1
  }

  function sub(a, b){
  return a-b 
  }
    
  `)
  const [ review, setReview ] = useState(``)
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post('http://localhost:3000/ai/get-review', { code })
      setReview(response.data.response)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to get review')
      console.error('Review error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 'clamp(14px, 2vw, 16px)', // responsive font size
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                color:"white",
              }}
            />
          </div>
          <button 
            onClick={reviewCode} 
            className="review" 
            disabled={loading}>
            {loading ? 'Reviewing...' : 'Review and Improve Code..'}
          </button>
        </div>
        <div className="right">
          {error && <div className="error">{error}</div>}
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
      <div className="footer">
          <p style={{color:"white",margin:"5px 4px" , textAlign:"center" , background:"black",padding:"5px",}}>Made By Sumitt😎</p>
          </div>
    </>
  )
}



export default App