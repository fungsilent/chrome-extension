import { useState, useEffect } from 'react'
import { Worker } from '@react-pdf-viewer/core'

import Loading from './components/Loading'
import Error from './components/Error'
import Setting from './components/Setting'
import Schedule from './components/Schedule'
import PDFViewer from './components/PDFViewer'
import { findWorkspace, fetchWorkspaceToken, findChannel, fetchMessage } from './data'
import './main.css'

const App = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [pdf, setPdf] = useState('')
    const [{ isLoading, error, data }, setFetchData] = useState({
        isLoading: false,
        error: '',
        data: [],
    })

    // useEffect(() => {
    //     const doFetch = async () => {
    //         setFetchData(state => ({
    //             ...state,
    //             isLoading: true,
    //         }))
    //         const isLogin = await fetchWorkspaceToken()
    //         if (!isLogin) {
    //             return setFetchData(state => ({
    //                 ...state,
    //                 isLoading: false,
    //                 error: 'invalid_auth',
    //             }))
    //         }

    //         const [data, error] = await fetchMessage()
    //         setFetchData(state => ({
    //             ...state,
    //             isLoading: false,
    //             data,
    //             error,
    //         }))
    //     }
    //     doFetch()
    // }, [])

    const openModal = pdf => {
        setPdf(pdf)
        setModalOpen(true)
    }
    const closeModal = () => setModalOpen(false)

    /* render */
    return (
        <Worker workerUrl='./pdf.worker.min.js'>
            <main>
                <Setting />
                {isLoading && <Loading />}
                {!!error && <Error message={error} />}
                {!error && (
                    <Schedule
                        data={data}
                        openModal={openModal}
                    />
                )}
                <PDFViewer
                    pdf={pdf}
                    modalOpen={modalOpen}
                    closeModal={closeModal}
                />
            </main>
        </Worker>
    )
}

export default App
