import testJson from './data.test.json'

export const fetchApiToken = async () => {
    try {
        const response = await fetch(process.env.REACT_APP_TOKEN_API, {
            credentials: 'include',
        })
        const html = await response.text()
        const [, token] = html.match(/"api_token":"([a-z0-9-]*)/)
        // TODO: how to make it fit to other cohort
        localStorage.setItem(process.env.REACT_APP_WORKSPACE_TOKEN_KEY, token)
        localStorage.setItem(
            process.env.REACT_APP_WORKSPACE_CHANNEL_KEY,
            process.env.REACT_APP_WORKSPACE_CHANNEL_VALUE
        )

        return true
    } catch (err) {
        console.log(`[ERROR] fetchApiToken:`, err.message)
        return false
    }
}

export const fetchMessage = async () => {
    if (!chrome?.runtime) {
        /* development use */
        // return [null, 'invalid_auth']
        // return [null, 'unkonwn']
        return [formatMessage(testJson.history.messages), null]
    }
    try {
        const formData = new FormData()
        formData.append(
            process.env.REACT_APP_WORKSPACE_TOKEN_KEY,
            localStorage.getItem(process.env.REACT_APP_WORKSPACE_TOKEN_KEY)
        )
        formData.append(
            process.env.REACT_APP_WORKSPACE_CHANNEL_KEY,
            localStorage.getItem(process.env.REACT_APP_WORKSPACE_CHANNEL_KEY)
        )

        let response = await fetch(process.env.REACT_APP_HISTORY_API, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
        response = await response.json()

        if (!response.ok) {
            throw new Error(response.error)
        }

        return [formatMessage(response.history.messages), null]
    } catch (err) {
        console.log(`[ERROR] fetchMessage:`, err.message)
        return [null, err.message]
    }
}

const formatMessage = messages => {
    const filteredData = messages.filter(message => !!message.files)
    const schedules = filteredData.map(item => {
        const texts = item.blocks[0].elements[0].elements
        const schedule = formatWeekSchedule(texts)
        return {
            ...schedule,
            pdf: item.files[0].url_private,
        }
    })
    return schedules
}

const roomMap = [
    {
        room: 1,
        floor: 2,
        address:
            'Training Room 1, Unit 01A-B, 2/F, Millennium Trade Centre, 56 Kwai Cheong Road, Kwai Chung, N.T.',
    },
    {
        room: 2,
        floor: 2,
        address:
            'Training Room 2, Unit 01A-B, 2/F, Millennium Trade Centre, 56 Kwai Cheong Road, Kwai Chung, N.T.',
    },
    {
        room: 3,
        floor: 7,
        address:
            'Classroom, Unit 03, 7/F, Millennium Trade Centre, 56 Kwai Cheong Road, Kwai Chung, N.T.',
    },
]

const formatWeekSchedule = elements => {
    let data = {
        week: '',
        schedule: [],
    }
    // data mapping flag
    let dayFlag = -1
    let timeFlag = ''

    elements.forEach((elem, index) => {
        // dont ask why need forEach, slack is suck
        elem.text.split('\n').forEach(exactElem => {
            try {
                const text = exactElem
                const textLow = text.toLowerCase()
                if (!text) return

                // week
                const week = text.match(/Week \d+/)
                if (!!week) {
                    data.week = Number(week[0].split(' ')[1])
                    return
                }

                // day
                const day = text.match(/\d{1,2} [A-Za-z]{3} \([A-Za-z]{3,4}\)/)
                if (!!day) {
                    dayFlag++
                    timeFlag = ''
                    data.schedule[dayFlag] = {
                        day: day[0],
                    }
                    return
                }

                /* handle day data */
                // holiday
                if (textLow.search('public holiday') > -1) {
                    data.schedule[dayFlag] = {
                        ...data.schedule[dayFlag],
                        holiday: true,
                    }
                    return
                }

                // teams link url
                if (text.search('https://') > -1) {
                    data.schedule[dayFlag] = {
                        ...data.schedule[dayFlag],
                        [timeFlag]: {
                            ...data.schedule[dayFlag][timeFlag],
                            link: elem.url,
                        },
                    }
                    return
                }

                // teams link text
                const time = text.match(/AM|PM/)
                if (time) {
                    timeFlag = time[0].toLowerCase()
                }
                if (textLow.search('teams') > -1) {
                    const [head, remark] = text
                        .replace(/AM|PM/, '')
                        .replace(/Teams Link|Teams/, '{cut}')
                        .split('{cut}')
                    const [, name] = head.match(/\s*(\w+)/)

                    // check timeFlag for online
                    timeFlag = !!timeFlag ? timeFlag : 'both'

                    data.schedule[dayFlag] = {
                        ...data.schedule[dayFlag],
                        [timeFlag]: {
                            name,
                            remark: remark.replace(':', '').trim(),
                            link: '',
                            isOnline: true,
                        },
                    }
                    return
                }

                // room
                const address = roomMap.find(item => item.address === text)
                if (!!address) {
                    // check timeFlag for in-person
                    timeFlag = !!timeFlag ? timeFlag : 'both'

                    data.schedule[dayFlag] = {
                        ...data.schedule[dayFlag],
                        [timeFlag]: {
                            ...address,
                            isOnline: false,
                        },
                    }
                    return
                }
            } catch (err) {
                console.log(`[ERROR] formatWeekSchedule: ${index}`, err.message)
            }
        })
    })
    return data
}
