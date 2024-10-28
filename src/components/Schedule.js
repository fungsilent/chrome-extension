import moment from 'moment'
import PDFIcon from 'components/PDFIcon'

const Schedule = ({ data, openModal }) => {
    return (
        <section className='schedule'>
            {data.map((weekData, weekIndex) => (
                <div
                    key={weekIndex}
                    className='week'
                >
                    <p className='week-num'>WEEK {weekData.week || data.length - weekIndex}</p>
                    <div
                        className='view-pdf'
                        onClick={() => openModal(weekData.pdf)}
                    >
                        <PDFIcon />
                    </div>
                    <div className='days'>
                        {weekData.schedule.map((dayData, dayIndex) => (
                            <Day
                                key={dayIndex}
                                baseOrder={dayIndex}
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
    const { baseOrder, date, day, month, holiday, am, pm, both } = props

    // calculate is today
    const today = moment()
    const isToday = today.format('D') === day && today.format('MMM') === month

    const renderInPerson = ({ floor, room, time }) => (
        <div className='in-person'>
            <p className='title'>
                <span>In Person</span>
                <span className='time'>{time}</span>
            </p>
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
        let data = { ...rest }
        let style = {}
        switch (type) {
            case 'both': {
                style = {
                    order: baseOrder + 5,
                    gridRow: 'span 2',
                }
                break
            }
            case 'am': {
                style = {
                    order: baseOrder + 5,
                }
                data = {
                    ...data,
                    time: 'AM',
                }
                break
            }
            case 'pm': {
                style = {
                    order: baseOrder + 10,
                }
                data = {
                    ...data,
                    time: 'PM',
                }
                break
            }
        }

        return (
            <div
                className={`class ${type}`}
                style={style}
            >
                {isOnline ? renderOnline(data) : renderInPerson(data)}
            </div>
        )
    }

    const renderHoliday = () => (
        <div
            className={`class holiday`}
            style={{ order: baseOrder + 5, gridRow: 'span 2' }}
        >
            <p className='title'>Holiday</p>
        </div>
    )

    return (
        <>
            <div
                className={`date ${isToday ? 'today' : ''}`}
                style={{ order: baseOrder }}
            >
                {date}
            </div>
            {!!am && renderInfo('am', am)}
            {!!pm && renderInfo('pm', pm)}
            {!!both && renderInfo('both', both)}
            {!!holiday && renderHoliday()}
        </>
    )
}

export default Schedule
