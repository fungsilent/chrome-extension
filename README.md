# Development

`npm start`

### Chrome

Due to the CORS (Cross-Origin Resource Sharing) policy, it is necessary to use a fully disabled CORS Chrome for testing and development.\
Open Chrome with

#### Windows:

> [!NOTE]
> CMD not PowerShell

```cmd
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="C:\temp\chrome"
```

#### macOS:

```bash
open -a "Google Chrome" --args --disable-web-security --user-data-dir="/tmp/chrome"
```

# Production

`npm run build`

### Install

Load unpacked extension in chrome and select the `build` directory

```
weekly-schedule
│-- build
|-- node_modules
└───public
|   |-- ...
│
└───src
│   │-- components
│   │-- App.js
|   |-- ...
|
|-- package.json
|-- README.md
|-- ...
```

# git cheat sheet

1. `git pull --rebase upstream main`
2. `git add.`
3. `git rebase --contine`
4. `:x`
5. `git push --force origin main`
