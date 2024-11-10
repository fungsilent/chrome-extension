import config from 'config'

const { env } = config

export const getSetting = () => {
    return {
        workspace: localStorage.getItem(env.workspace),
        channel: localStorage.getItem(env.workspaceChannel),
    }
}

export const setSetting = ({ workspace, token, channel }) => {
    localStorage.setItem(env.workspace, workspace || '')
    localStorage.setItem(env.workspaceToken, token || '')
    localStorage.setItem(env.workspaceChannel, channel || '')
}
