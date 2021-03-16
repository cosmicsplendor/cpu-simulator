import handleError from "../helpers/handleError"

interface Stack {
    content: number[]
    getLength: (arg: void) => number
    getLastElement: (arg: void) => number
    push: (arg: number) => void
    pop: (arg: string) => number
}
interface Instruction {
    name: string
    param?: string | number;
    label?: string
    lineNumber: number
}
type ParseLineFunction = (line: string, index: number) => Instruction

class CPU {
    private stack: Stack = {
        content: [],
        getLength() {
            return this.content.length
        },
        getLastElement() {
            return this.content[ this.getLength() - 1 ]
        },
        push(num: number) {
            this.content.push(num)
        },
        pop(caller) {
            if (this.content.length === 0) {
                handleError(`(${caller}): stack underflow`)
            }
            return this.content.pop()
        }
    }
    private R: number = null
    private instructions: Instruction[]
    private mathOperations: string[] = ["add", "sub", "mul", "div", "mod"]
    static parseLine: ParseLineFunction = (line, index) => {
        const lineNumber: number = index + 1
        const lineMinusLabel: string = line.replace(/^.+:/, "")
        const label: string = line.replace(lineMinusLabel, "").replace(":", "")
        const tokens: string[] = lineMinusLabel.trim().split(" ")

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
        this.stack.content = []
        this.R = null
    }
    private jump(to: number | string) {
        let lineToJumpTo: number
        if (typeof to === "number") { // if the to arg represents the line number
            lineToJumpTo = to
            if (lineToJumpTo < 1 || lineToJumpTo > this.instructions.length) {
                handleError(`ERROR: undefined address ${to}`)
            }
        } else if (typeof to === "string") { // if the to arg represents the label
            lineToJumpTo = this.instructions.findIndex(({ label }) => label === to) + 1
            lineToJumpTo === 0 && handleError(`(jump): undefined label ${to}`)
        }
        this.run(
            this.instructions.slice(lineToJumpTo - 1)
        )
    }
    setInstructions(value: Instruction[]) {
        this.instructions = value
        return this
    }
    run(instructions: Instruction[] = this.instructions) {
        for (const instruction of instructions) {
            const { name, param } = instruction
            if (this.mathOperations.includes(name)) {
                const num2: number = this.stack.pop(name)
                const num1: number = this.stack.pop(name)
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
                        this.stack.push(Math.round(Number(param)))
                    break
                    case "pop":
                        this.stack.pop(name)
                    break
                    case "load":
                        this.R = this.stack.pop(name)
                    break
                    case "store":
                        this.stack.push(this.R)
                    break
                    case "jump":
                        return this.jump(param)
                    break
                    case "jumpz":
                        if (this.stack.getLastElement() === 0) {
                            return this.jump(param)
                        }
                    break
                    case "jumpnz":
                        if (this.stack.getLastElement() !== 0) {
                            return this.jump(param)
                        }
                    break
                    case "print":
                        console.log(this.stack.getLastElement())
                    break
                    case "stack":
                        console.log(this.stack.content)
                    break
                    default:
                        handleError(`(${name}): unknown instruction`)
                }
            }
            
        }
        this.clear()
    }
}

export default CPU