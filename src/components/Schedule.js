const Shcedule = ({ data, openModal }) => {
    // files[0].url_private
    // let pdf =
    //     'https://files.slack.com/files-pri/T07K4E7N8AG-F07S9CUQWSE/week_9.pdf'

    console.log('data', data)

    return (
        <section className='shcedule'>
            {data.map(weekData => (
                <div
                    key={weekData.week}
                    className='week'
                >
                    <p className='week-num'>Week {weekData.week}</p>
                    <div
                        className='view-pdf'
                        onClick={() => openModal(weekData.pdf)}
                    >
                        View PDF
                    </div>
                    <div className='day-container'>
                        {weekData.schedule.map((dayData, index) => (
                            <Day
                                key={index}
                                {...dayData}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    )
}

const Day = props => {
    // console.log('Day', props)
    const { day, holiday, am, pm, both } = props

    const renderInPerson = ({ floor, room }) => (
        <div className='in-person'>
            <p className='title'>In Person</p>
            <p className='content'>
                <span>{floor}/F</span>
                <span>Room {room}</span>
            </p>
        </div>
    )

    const renderOnline = ({ name, link, remark, time }) => (
        <div className='online'>
            <p className='title'>
                <span>Online</span>
                <span className='time'>{time}</span>
            </p>
            <p className='content'>
                <span>{name}</span>
                {!!link && (
                    <a
                        className='link'
                        href={link}
                        target='_blank'
                    >
                        Teams
                    </a>
                )}
                {!!remark && <span className='remark'>{remark}</span>}
            </p>
        </div>
    )

    const renderInfo = (type, { isOnline, ...rest }) => {
        const timeMap = {
            am: 'AM',
            pm: 'PM',
        }
        return (
            <div className={`class ${type}`}>
                {isOnline
                    ? renderOnline({ ...rest, time: timeMap[type] })
                    : renderInPerson(rest)}
            </div>
        )
    }

    const renderHoliday = () => (
        <div className='class holiday'>
            <p className='title'>Holiday</p>
        </div>
    )

    return (
        <div className='day'>
            <div className='date'>{day}</div>
            {!!am && renderInfo('am', am)}
            {!!pm && renderInfo('pm', pm)}
            {!!both && renderInfo('both', both)}
            {!!holiday && renderHoliday()}
        </div>
    )
}

const testPdf = () => {
    const real =
        'https://files.slack.com/files-pri/T07K4E7N8AG-F07S9CUQWSE/week_9.pdf'
    const test =
        'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    if (!chrome?.runtime) {
        return test
    }
    return real
}

export default Shcedule
