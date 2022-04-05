import React, { Suspense } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'

import QuotesLayout from './components/layout/QuotesLayout'
import Layout from './components/layout/Layout'

import LoadingSpinner from './components/UI/LoadingSpinner'

const AllQuotes = React.lazy(() => import('./pages/AllQuotes'))
const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))
const Comments = React.lazy(() => import('./components/comments/Comments'))

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="quotes" />} />
          <Route path="quotes" element={<QuotesLayout />}>
            <Route index element={<AllQuotes />} />
            <Route path=":quoteId" element={<QuoteDetail />}>
              <Route
                index
                element={
                  <div className="centered">
                    <Link className="btn--flat" to="comments">
                      Load Comment
                    </Link>
                  </div>
                }
              />
              <Route path="comments" element={<Comments />} />
            </Route>
          </Route>
          <Route path="new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
