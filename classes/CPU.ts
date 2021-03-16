interface Instruction {
    name: string
    param?: string | number;
    label?: string
    lineNumber: number
}
type ParseLineFunction = (line: string, index: number) => Instruction

class CPU {
    private stack: number[]
    private R: number
    private instructions: Instruction[]
    private mathOperations: string[] = ["add", "sub", "mul", "div", "mod"]
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
            const param: string = tokens[1].trim()
            const isNumber: boolean = !Number.isNaN(Number(param))
            instruction.param = isNumber ? Number(param): param
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
    jump(to: number | string) {
        let lineToJumpTo: number
        if (typeof to === "number") { // if the to represents the line number
            lineToJumpTo = to
        } else if (typeof to === "string") { // if the to represents the label
            lineToJumpTo = this.instructions.findIndex(({ label }) => label === to) + 1
        }
        this.run(
            this.instructions.slice(lineToJumpTo - 1)
        )
    }
    run(instructions: Instruction[] = this.instructions) {
        this.clear()
        for (const instruction of instructions) {
            const { name, param } = instruction

            if (this.mathOperations.includes(name)) {
                const num2: number = this.stack.pop()
                const num1: number = this.stack.pop()
                switch(name) {
                    case "add":
                        this.stack.push(num1 + num2)
                    break
                    case "sub":
                        this.stack.push(num1 - num2)
                    break
                    case "mul":
                        this.stack.push(num1 * num2)
                    break
                    case "divide":
                        this.stack.push(num1 / num2)
                    break
                    case "mod":
                        this.stack.push(num1 % num2)
                    break
                }
            } else {
                switch(name) {
                    case "nop":
    
                    break
                    case "push":
                        this.stack.push(Number(param))
                    break
                    case "pop":
                        this.stack.pop()
                    break
                    case "load":
                        this.R = this.stack.pop()
                    break
                    case "store":
                        this.stack.push(this.R)
                    break
                    case "jump":
                        return this.jump(param)
                    break
                    case "jumpz":
                        if (this.stack[ this.stack.length - 1 ] === 0) {
                            return this.jump(param)
                        }
                    break
                    case "jumpnz":
                        if (this.stack[ this.stack.length - 1 ] !== 0) {
                            return this.jump(param)
                        }
                    break
                    case "print":
                        console.log(this.stack[this.stack.length - 1])
                    break
                    case "stack":
                        console.log(this.stack)
                    break
                }
            }
            
        }
    }
}

export default CPU