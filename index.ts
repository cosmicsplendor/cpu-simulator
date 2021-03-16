import { readFileSync } from "fs"
import handleError from "./helpers/handleError"
import CPU, { Instruction } from "./classes/CPU"

const filename: string = process.argv[2]
let fileContent: string

try {
    fileContent = readFileSync(filename, { encoding: "utf-8" })
} catch(e) {
    handleError(`unable to open file ${filename} (${e.message})`)
}

const lines: string[] = fileContent.trim().split("\n")

const instructions: Instruction[] = lines.map(CPU.parseLine)

const cpu = new CPU()

cpu.setInstructions(instructions).run()

