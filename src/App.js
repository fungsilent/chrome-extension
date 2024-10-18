import { useState, useEffect } from 'react'
import Error from './components/Error'
import Shcedule from './components/Shcedule'
import { fetchMessage } from './data'
import './main.css'

const App = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState({})

    console.log('data', data)

    useEffect(() => {
        const doFetch = async () => {
            const [data, error] = await fetchMessage()
            console.log('doFetch', data, error)
            setError(error)
            setData(data)
        }
        doFetch()
    }, [])

    // TODO: display data

    /* render */
    return (
        <main>
            {!!error && <Error message={error} />}
            {!error && <Shcedule data={data} />}
        </main>
    )
}

export default App
