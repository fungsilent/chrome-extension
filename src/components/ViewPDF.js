import { useState } from 'react'

import { Viewer } from '@react-pdf-viewer/core'

import { SelectionMode } from '@react-pdf-viewer/selection-mode'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
import '@react-pdf-viewer/toolbar/lib/styles/index.css'

import '@react-pdf-viewer/core/lib/styles/index.css'

import Modal from 'react-modal'
Modal.setAppElement('#root')

const styles = {
    overlay: {
        backgroundColor: 'rgb(40 40 40 / 70%)',
    },
    content: {
        inset: '40px 0 0 0',
        padding: 0,
    },
}

const ViewPDF = ({ pdf, modalOpen, setModalOpen }) => {
    const toolbarPluginInstance = toolbarPlugin({
        selectionModePlugin: {
            selectionMode: SelectionMode.Hand,
        },
    })
    const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    /* render */
    const toolbarTransform = slot => ({
        ...slot,
        ShowSearchPopover: () => <></>,
        Download: () => <></>,
        Open: () => <></>,
        Print: () => <></>,
        Rotate: () => <></>,
        RotateBackwardMenuItem: () => <></>,
        RotateForwardMenuItem: () => <></>,
        EnterFullScreen: () => <></>,
        SwitchTheme: () => <></>,
    })

    return (
        <div>
            <button onClick={openModal}>View PDF</button>
            <Modal
                isOpen={modalOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={styles}
                contentLabel='Example Modal'
            >
                <div
                    style={{
                        alignItems: 'center',
                        backgroundColor: '#eeeeee',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        padding: '0.25rem',
                    }}
                >
                    <Toolbar>{renderDefaultToolbar(toolbarTransform)}</Toolbar>
                </div>
                <Viewer
                    fileUrl={pdf}
                    plugins={[toolbarPluginInstance]}
                />
            </Modal>
        </div>
    )
}

export default ViewPDF
