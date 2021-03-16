interface Instruction {
    name: string
    param?: string | number;
    label?: string
    lineNumber: number
}
type ParseLineFunction = (line: string, index: number) => Instruction

class CPU {
    private stack
    private R
    private instructions: Instruction[]
    static parseLine: ParseLineFunction = (line, index) => {
        const lineNumber: number = index + 1
        const lineMinusLabel: string = line.replace(/^.+:/, "")
        const label: string = line.replace(lineMinusLabel, "")
        const tokens: string[] = lineMinusLabel.split(" ")

        const instruction: Instruction = {
            name: tokens[0].trim(),
            lineNumber
        }

        if (tokens.length > 1) {
            instruction.param = tokens.length[1]
        }

        if (label !== "") {
            instruction.label = label
        }

        return instruction
    }
    private clear() {
        this.stack = []
        this.R = null
    }
    setInstructions(value: Instruction[]) {
        this.instructions = value
        return this
    }
    run() {
        this.clear()
        this.instructions.forEach((instruction: Instruction) => {
            const { name } = instruction
            switch(name) {
                case "nop":

                break
                case "push":

                break
                case "pop":

                break
                case "load":

                break
                case "store":
                    
                break
                case "add":

                break
                case "sub":

                break
                case "mul":

                break
                case "divide":

                break
                case "mod":

                break
                case "jump":

                break
                case "jumpz":

                break
                case "jumpnz":
                    
                break
                case "print":

                break
                case "stack":

                break
            }
        })
    }
}

export default CPU