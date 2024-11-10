let config = {
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
        findWorkspaceToken: 'https://{workspace}/ssb/redirect',
        findChannel: `${config.api.base}/conversations.list`,
        fetchHistory: `${config.api.base}/conversations.history`,
    },
}

console.log('config', config)
export default config
