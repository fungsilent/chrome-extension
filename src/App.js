import { useState, useEffect } from 'react'
import { Worker } from '@react-pdf-viewer/core'

import Error from './components/Error'
import Shcedule from './components/Shcedule'
import ViewPDF from './components/ViewPDF'
import { fetchMessage } from './data'
import './main.css'

const App = () => {
    const [modalOpen, setModalOpen] = useState(false)
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

    let pdf =
        'https://files.slack.com/files-pri/T07K4E7N8AG-F07S9CUQWSE/week_9.pdf'
    pdf =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

    // TODO: display data

    /* render */
    return (
        <Worker workerUrl='./pdf.worker.min.js'>
            <main>
                {!!error && <Error message={error} />}
                {!error && <Shcedule data={data} />}
                <ViewPDF
                    pdf={pdf}
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                />
            </main>
        </Worker>
    )
}

export default App
