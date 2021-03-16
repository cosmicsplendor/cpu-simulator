type HandleErrorFunction = (message: string) => void

const handleError: HandleErrorFunction = message => {
    console.log(`ERROR ${message}`)
    process.exit(1)
}

export default handleError