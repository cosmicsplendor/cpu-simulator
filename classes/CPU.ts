type ParseLineFunction = (line: string, index: number) => ({ })

class CPU {
    private instructions
    static parseLine: ParseLineFunction = (line, index) => {
        const lineNumber: number = index + 1
        const params: string[] = line.trim().split(" ")
        return {}
    }
    constructor(instructions) {

    }
}

export default CPU