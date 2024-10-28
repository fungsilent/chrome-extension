import { useState, useEffect } from 'react'
import { Worker } from '@react-pdf-viewer/core'
import { useErrorBoundary } from 'react-error-boundary'

import useFetch from 'hooks/useFetch'
import Loading from 'components/Loading'
import Schedule from 'components/Schedule'
import PDFViewer from 'components/PDFViewer'
import { fetchWorkspaceToken, fetchMessage } from 'data'
import Loader from 'components/Loader'

const PageSchedule = ({ workspaceUrl }) => {
    const { showBoundary } = useErrorBoundary()
    const [dispatchToken, workspaceToken, loadToken, tokenError] = useFetch('token', '')
    const [dispatchMessage, messages, loadMessages, messagesError] = useFetch('message', null)
    const [modalOpen, setModalOpen] = useState(false)
    const [pdf, setPdf] = useState('')
    // const [{ isLoading, error, data }, setFetchData] = useState({
    //     isLoading: false,
    //     error: '',
    //     data: [],
    // })
    if (tokenError || messagesError) {
        showBoundary(tokenError || messagesError)
    }

    useEffect(() => {
        dispatchToken(() => fetchWorkspaceToken(workspaceUrl))
    }, [])

    useEffect(() => {
        if (workspaceToken) {
            dispatchMessage(() => fetchMessage(dispatchToken))
        }
    }, [workspaceToken])

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

    /* Render */
    const openModal = pdf => {
        setPdf(pdf)
        setModalOpen(true)
    }
    const closeModal = () => setModalOpen(false)

    return (
        <>
            {!!messages ? (
                <Worker workerUrl='/pdf.worker.min.js'>
                    <Schedule
                        data={messages}
                        openModal={openModal}
                    />
                    <PDFViewer
                        pdf={pdf}
                        modalOpen={modalOpen}
                        closeModal={closeModal}
                    />
                </Worker>
            ) : (
                <Loading />
            )}
        </>
    )
}

export default PageSchedule
