import { useState, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Routes, Route, useNavigate } from 'react-router-dom'

import PageLanding from 'pages/Landing'
import PageSchedule from 'pages/Schedule'
import PageSetting from 'pages/Setting'
import Error from 'components/Error'
import 'main.css'

const App = () => {
    /* Render */
    return (
        <main>
            <ErrorBoundary FallbackComponent={Error}>
                <Routes>
                    <Route
                        path='/'
                        element={<PageLanding />}
                    />
                    <Route
                        path='/setting'
                        element={<PageSetting />}
                    />
                    <Route
                        path='/schedule'
                        element={<PageSchedule />}
                    />
                </Routes>
            </ErrorBoundary>
        </main>
    )
}

export default App
