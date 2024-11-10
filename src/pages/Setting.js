import { useState, useEffect } from 'react'
import ReactSelect from 'react-select'
import Loader from 'components/Loader'
import { fetchWorkspaceToken, findChannel } from 'data'
import useFetch from 'hooks/useFetch'
import { getSetting, setSetting } from 'utils'

const PageSetting = () => {
    const [setting, _setState] = useState(getSetting())
    const [dispatchToken, workspaceToken = '', loadToken, tokenError] = useFetch('token')
    const [dispatchChannel, channels = [], loadChannels, channelsError] = useFetch('channels')

    if (tokenError || channelsError) {
        throw new Error(tokenError || channelsError)
    }

    const setState = update => {
        _setState(state => ({ ...state, ...update }))
    }

    useEffect(() => {
        if (workspaceToken) {
            dispatchChannel(() => findChannel(workspaceToken))
        }
    }, [workspaceToken])

    /* Event */
    const onWorkspaceChange = event => {
        setState({ workspace: event.target.value.trim() })
    }

    const onFetchChannels = () => {
        dispatchToken(() => fetchWorkspaceToken(setting.workspace))
    }

    const onSelectChannel = channel => {
        setState({ channel: channel.id })
    }

    const saveSetting = () => {
        setSetting({
            ...setting,
            token: workspaceToken,
        })
    }

    /* Render */
    const channelValue = channels.find(item => item.id === setting.channel) ?? null

    return (
        <section className='setting'>
            <div className='back'></div>
            <div className='container'>
                <div className='box'>
                    <p>Workspace URL</p>
                    <p className='sub'>e.g. juniorfullsta-ka69329.slack.com</p>
                    <div className='input'>
                        <input
                            name='workspace'
                            type='text'
                            value={setting.workspace}
                            onChange={onWorkspaceChange}
                        />
                        <span
                            className='button'
                            onClick={onFetchChannels}
                        >
                            Fetch Channels
                        </span>
                    </div>
                </div>
                <div className='box'>
                    <p>Channel</p>
                    <Select
                        className='select select-channel'
                        placeholder='Select Channel'
                        value={channelValue}
                        options={channels}
                        onChange={onSelectChannel}
                        noOptionsMessage={() => 'No Channels'}
                        isLoading={loadToken || loadChannels}
                        isDisabled={loadToken || loadChannels}
                    />
                    <p className='sub'>
                        Current <strong>Channel ID:</strong> {setting.channel}
                    </p>
                </div>

                <SaveButton onSave={saveSetting} />
            </div>
        </section>
    )
}

/* Select */
const Select = props => {
    return (
        <ReactSelect
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
            unstyled
            // defaultMenuIsOpen
            loadingMessage={() => <Loader />}
            components={{
                LoadingIndicator: props => <Loader style={{ width: 80 }} />,
            }}
            styles={{
                control: styles => ({
                    ...styles,
                    backgroundColor: '#606C38',
                    color: '#FEFAE0',
                    borderRadius: 4,
                    overflow: 'hidden',
                }),
                valueContainer: styles => ({
                    ...styles,
                    padding: 12,
                }),
                indicatorsContainer: (styles, state) => ({
                    ...styles,
                    backgroundColor: '#283618',
                    padding: '0 10px',
                    cursor: 'pointer',
                }),
                menu: styles => ({
                    ...styles,
                    top: 'calc(100% + 8px)',
                    borderRadius: 4,
                }),
                menuList: styles => ({
                    ...styles,
                    backgroundColor: '#fff',
                    filter: 'drop-shadow(0 0 5px #00000030)',
                }),
                option: styles => ({
                    ...styles,
                    color: '#283618',
                    padding: 12,
                    '&:hover': {
                        color: '#765333',
                        backgroundColor: '#dda15e',
                    },
                }),
                noOptionsMessage: styles => ({
                    ...styles,
                    color: '#765333',
                    padding: 12,
                }),
                loadingIndicator: styles => ({
                    ...styles,
                    marginRight: 10,
                }),
                loadingMessage: styles => ({
                    ...styles,
                    padding: '24px 32px',
                }),
            }}
            {...props}
        />
    )
}

const SaveButton = ({ onSave }) => {
    const [showSuccess, setShowSuccess] = useState(false)

    const onClick = () => {
        onSave()
        setShowSuccess(true)
    }

    useEffect(() => {
        if (!showSuccess) return

        const showMessage = setTimeout(() => {
            setShowSuccess(false)
        }, 1000)
        return () => {
            clearTimeout(showMessage)
        }
    }, [showSuccess])

    return (
        <div className='save'>
            {showSuccess && <p className='success'>Saved!</p>}
            <div
                className='button'
                onClick={onClick}
            >
                Save
            </div>
        </div>
    )
}

export default PageSetting
