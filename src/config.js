let config = {
    dev: process.env.REACT_APP_ENV === 'development',
    api: {
        base: 'https://slack.com/api',
    },
    env: {
        workspace: 'workspace',
        workspaceToken: 'token',
        workspaceChannel: 'channel',
    },
}

config = {
    ...config,
    api: {
        ...config.api,
        findWorkspace: `${config.api.base}/signin.findWorkspaces`,
        findChannel: `${config.api.base}/conversations.list`,
        fetchHistory: `${config.api.base}/conversations.history`,
    },
}

console.log('config', config)
export default config
