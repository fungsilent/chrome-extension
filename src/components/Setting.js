import { useState, useEffect } from 'react'
import ReactSelect from 'react-select'
import Loader from './Loader'
import { findWorkspace, fetchWorkspaceToken, findChannel, fetchMessage } from '../data'
import useFetch from '../hooks/useFetch'
import config from '../config'

const { env } = config
// const testData = {
//     workspaces: [
//         {
//             domain: 'juniorfullsta-ka69329',
//             id: 'T07K4E7N8AG',
//             name: 'Junior Full Stack Developer Program Cohort 12',
//             url: 'https://juniorfullsta-ka69329.slack.com/ssb/redirect',
//         },
//         {
//             domain: 'test-pqy3056',
//             id: 'T07UA8CR6SC',
//             name: 'Test',
//             url: 'https://test-pqy3056.slack.com/ssb/redirect',
//         },
//     ],
//     channels: [
//         {
//             id: 'C07JZ4B6677',
//             name: 'weekly-shcedule',
//         },
//         {
//             id: 'C07KAC296T0',
//             name: 'tech',
//         },
//         {
//             id: 'C07K1S46LEP',
//             name: 'general',
//         },
//     ],
// }
// const { workspaces, channels } = testData

const Setting = () => {
    const [setting, _setState] = useState(getSetting())
    const [dispatchWorkspace, workspaces = [], loadWorkspaces, workspacesError] = useFetch('workspaces', [])
    const [dispatchToken, workspaceToken = '', loadToken, tokenError] = useFetch('token', '')
    const [dispatchChannel, channels = [], loadChannels, channelsError] = useFetch('channels', [])

    // console.log('>>>>>>>>>>>>>>> setting', setting)

    const setState = update => {
        _setState(state => ({ ...state, ...update }))
    }

    useEffect(() => {
        dispatchWorkspace(findWorkspace)
    }, [])

    useEffect(() => {
        const selected = workspaces.find(ws => ws.id === setting.workspace)
        if (selected) {
            setState({
                workspace: selected?.id,
                workspaceUrl: selected?.url,
            })
        }
    }, [workspaces])

    useEffect(() => {
        if (setting.workspace) {
            dispatchToken(() => fetchWorkspaceToken(setting.workspaceUrl))
        }
    }, [setting.workspace])

    useEffect(() => {
        if (workspaceToken) {
            dispatchChannel(() => findChannel(workspaceToken))
        }
    }, [workspaceToken])

    /* Event */
    const onSelectWorkspace = workspace => {
        if (workspace.value !== setting.workspace) {
            setState({ channel: '' })
        }
        setState({
            workspace: workspace.id,
            workspaceUrl: workspace.url,
        })
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
    const workspaceValue = workspaces.find(item => item.id === setting.workspace) ?? null
    const channelValue = channels.find(item => item.id === setting.channel) ?? null

    return (
        <section className='setting'>
            <div className='container'>
                <div className='box'>
                    <p>Workspace</p>
                    <Select
                        className='select select-workspace'
                        placeholder='Select Workspace'
                        value={workspaceValue}
                        options={workspaces}
                        onChange={onSelectWorkspace}
                        noOptionsMessage={() => 'No Workspaces'}
                        isLoading={loadWorkspaces}
                        isDisabled={loadWorkspaces}
                    />
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
                </div>

                <div
                    className='save'
                    onClick={saveSetting}
                >
                    Save
                </div>
            </div>
        </section>
    )
}

function getSetting() {
    const workspace = JSON.parse(localStorage.getItem(env.workspace))
    return {
        workspace: workspace?.id,
        workspaceUrl: workspace?.url,
        channel: localStorage.getItem(env.workspaceChannel),
    }
}

function setSetting({ workspace, workspaceUrl, token, channel }) {
    localStorage.setItem(
        env.workspace,
        JSON.stringify({
            id: workspace,
            url: workspaceUrl,
        })
    )
    localStorage.setItem(env.workspaceToken, token)
    localStorage.setItem(env.workspaceChannel, channel)
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
                    padding: '0 12px',
                }),
                indicatorsContainer: (styles, state) => ({
                    ...styles,
                    backgroundColor: '#283618',
                    padding: '0 10px',
                    transition: '0.3s',
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

export default Setting
