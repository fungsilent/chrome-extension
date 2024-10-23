const Error = ({ message }) => {
    // let text = message === 'invalid_auth' ? ''

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
            </div>
        )
    }

    return (
        <section className='section-error'>
            {message === 'invalid_auth' ? renderRequireAuth() : renderUnknown()}
        </section>
    )
}

export default Error
