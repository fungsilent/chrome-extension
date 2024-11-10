import { useState, useEffect } from 'react'
import { Worker } from '@react-pdf-viewer/core'

import useFetch from 'hooks/useFetch'
import Loading from 'pages/Loading'
import Schedule from 'components/Schedule'
import PDFViewer from 'components/PDFViewer'
import { fetchWorkspaceToken, fetchMessage } from 'data'
import { getSetting } from 'utils'

const PageSchedule = () => {
    const [dispatchToken, workspaceToken = '', loadToken, tokenError] = useFetch('token')
    const [dispatchMessage, messages = null, loadMessages, messagesError] = useFetch('message')
    const [modalOpen, setModalOpen] = useState(false)
    const [pdf, setPdf] = useState('')

    if (tokenError || messagesError) {
        throw new Error(tokenError || messagesError)
    }

    useEffect(() => {
        const { workspace } = getSetting()
        dispatchToken(() => fetchWorkspaceToken(workspace))
    }, [])

    useEffect(() => {
        if (workspaceToken) {
            dispatchMessage(() => fetchMessage(dispatchToken))
        }
    }, [workspaceToken])

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
