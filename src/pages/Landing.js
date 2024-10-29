import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import PageLoading from 'pages/Loading'
import { getSetting } from 'utils'

const Landing = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const { workspace, channel } = getSetting()
        const hasSetting = !!workspace && !!channel
        const to = hasSetting ? '/schedule' : '/setting'
        navigate(to)
    }, [])

    return <PageLoading />
}

export default Landing
