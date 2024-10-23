import { useState, useEffect } from 'react'
import { Worker } from '@react-pdf-viewer/core'

import Error from './components/Error'
import Shcedule from './components/Schedule'
import ViewPDF from './components/ViewPDF'
import { fetchMessage } from './data'
import './main.css'

const App = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [pdf, setPdf] = useState('')
    const [error, setError] = useState('')
    const [data, setData] = useState({})

    console.log('data', data)

    useEffect(() => {
        const doFetch = async () => {
            const [data, error] = await fetchMessage()
            setError(error)
            setData(data)
        }
        doFetch()
    }, [])

    const openModal = pdf => {
        setPdf(pdf)
        setModalOpen(true)
    }
    const closeModal = () => setModalOpen(false)

    // TODO: display data

    /* render */
    return (
        <Worker workerUrl='./pdf.worker.min.js'>
            <main>
                {!!error && <Error message={error} />}
                {!error && (
                    <Shcedule
                        data={data}
                        openModal={openModal}
                    />
                )}
                <ViewPDF
                    pdf={pdf}
                    modalOpen={modalOpen}
                    closeModal={closeModal}
                />
            </main>
        </Worker>
    )
}

export default App
