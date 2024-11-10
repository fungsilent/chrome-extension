import { ErrorBoundary } from 'react-error-boundary'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

import Layout from 'pages/Layout'
import PageLanding from 'pages/Landing'
import PageSchedule from 'pages/Schedule'
import PageSetting from 'pages/Setting'
import Error from 'components/Error'
import 'main.css'

const App = () => {
    /* Render */
    return (
        <main>
            <MemoryRouter>
                <ErrorBoundary FallbackComponent={Error}>
                    <Routes>
                        <Route
                            path='/'
                            element={<Layout />}
                        >
                            <Route
                                index
                                element={<PageLanding />}
                                errorElement={<Error />}
                            />
                            <Route
                                path='/setting'
                                element={<PageSetting />}
                            />
                            <Route
                                path='/schedule'
                                element={<PageSchedule />}
                                errorElement={<Error />}
                            />
                        </Route>
                    </Routes>
                </ErrorBoundary>
            </MemoryRouter>
        </main>
    )
}

export default App
