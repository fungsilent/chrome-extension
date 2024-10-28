import config from 'config'

const { env } = config

export const getSetting = () => {
    try {
        const workspace = JSON.parse(localStorage.getItem(env.workspace))
        return {
            workspace: workspace?.id,
            workspaceUrl: workspace?.url,
            channel: localStorage.getItem(env.workspaceChannel),
        }
    } catch (err) {
        return {}
    }
}

export const setSetting = ({ workspace, workspaceUrl, token, channel }) => {
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
