const Shcedule = ({ data, openModal }) => {
    // files[0].url_private
    // let pdf =
    //     'https://files.slack.com/files-pri/T07K4E7N8AG-F07S9CUQWSE/week_9.pdf'
    const filterText = (messages) => {
        const result = [];
        for (const msg of messages) {
            if (msg.text && msg.text.includes('Week')) {
                const start = msg.text.indexOf('Week');
                const end = msg.text.length;
                result.push(msg.text.substring(start, end).replace(/\*/g, '').replace(/  /g, '\n').replace(/, Millennium Trade Centre, 56 Kwai Cheong Road, Kwai Chung, N.T./g, '').replace(/<[^|]*\|/g, '').replace(/>/g, ''));
            }
        }
        return result;
    };

    const weekTexts = filterText(data.history.messages);
    const [selectedWeek, setSelectedWeek] = useState(null);

    const handleChange = (event) => {
        setSelectedWeek(Number(event.target.value));
    };

    
    return (
        <div>
            //<p>TODO: display shcedule</p>
            <select onChange={handleChange}>
                <option value="" disabled selected>Select Week</option>
                {weekTexts.map((text, index) => {
                    const weekNumber = text.match(/Week \d+/)[0];
                    return (
                        <option key={index} value={index}>
                            {weekNumber}
                        </option>
                    );
                })}
            </select>
            {selectedWeek !== null && (
                <div>
                    <pre>{weekTexts[selectedWeek]}</pre>
                </div>
            )}
                
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
