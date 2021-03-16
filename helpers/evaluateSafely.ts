interface Params {
    fn: () => any;
    errorMsg: string
}

const evaluateSafely = (params: Params) => {
    const { fn, errorMsg } = params
    try {
        return fn()
    } catch(e) {
        console.log(errorMsg.concat(e.message ? ` (${e.message})`: ""))
        process.exit(1)
    }
}

export default evaluateSafely