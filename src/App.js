import { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import PageSchedule from 'pages/Schedule'
import Setting from 'pages/Setting'
import Error from 'components/Error'
import { getSetting } from 'utils'
import 'main.css'

const App = () => {
    const [{ workspaceUrl, channel }, setSetting] = useState(getSetting())
    const hasSetting = !!workspaceUrl && !!channel

    /* Render */
    return (
        <main>
            <ErrorBoundary FallbackComponent={Error}>
                {!hasSetting && <Setting />}
                {hasSetting && <PageSchedule workspaceUrl={workspaceUrl} />}
            </ErrorBoundary>
        </main>
    )
}

export default App
