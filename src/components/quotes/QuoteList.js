import { useNavigate, useLocation } from 'react-router-dom'

import QuoteItem from './QuoteItem'
import classes from './QuoteList.module.css'

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1
    } else {
      return quoteA.id < quoteB.id ? 1 : -1
    }
  })
}

const QuoteList = props => {
  const navigate = useNavigate()
  const location = useLocation()

  const isSortingAscending =
    new URLSearchParams(location.search).get('sort') === 'asc'

  const changeSortingHandler = () => {
    navigate('?sort=' + (isSortingAscending ? 'desc' : 'asc'))
  }

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)

  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map(quote => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>
  )
}

export default QuoteList
