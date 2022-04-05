import { useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom'

import HighLightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'

const QuoteDetail = () => {
  const params = useParams()
  const { quoteId } = params
  const {
    sendRequest,
    status,
    error,
    data: loadedQuote,
  } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className="centered">{error}</p>
  }

  if (!loadedQuote.text) {
    return <p>No Quote Found</p>
  }

  return (
    <>
      <HighLightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Outlet />
    </>
  )
}

export default QuoteDetail
