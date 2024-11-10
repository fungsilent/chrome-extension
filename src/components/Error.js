import { Link, useNavigate } from 'react-router-dom'

const Error = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate()

    const goSetting = () => {
        navigate('/setting')
        resetErrorBoundary()
    }

    const renderRequireAuth = () => {
        return (
            <div className='error error-auth'>
                <span className='text'>請先登入</span>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/127px-Slack_icon_2019.svg.png?20200128081203' />
                <span className='name'>slack</span>
            </div>
        )
    }

    const renderUnknown = () => {
        return (
            <div className='error error-unknown'>
                <span>發生未知錯誤</span>
                <span
                    className='check-setting'
                    onClick={goSetting}
                >
                    檢查設定
                </span>
            </div>
        )
    }

    return (
        <section className='section-error'>
            {error.message === 'invalid_auth' ? renderRequireAuth() : renderUnknown()}
        </section>
    )
}

export default Error
