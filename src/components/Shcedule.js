const Shcedule = ({ data, openModal }) => {
    // files[0].url_private
    // let pdf =
    //     'https://files.slack.com/files-pri/T07K4E7N8AG-F07S9CUQWSE/week_9.pdf'

    return (
        <div>
            <p>TODO: display shcedule</p>
            <button onClick={() => openModal(testPdf())}>View PDF</button>
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
