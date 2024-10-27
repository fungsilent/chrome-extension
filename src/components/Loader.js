const Loader = ({ className, ...props }) => {
    return (
        <div
            className={['loader', className].join(' ')}
            {...props}
        ></div>
    )
}

export default Loader
