import { readFileSync } from "fs"
import * as path from "path"
import evaluateSafely from "./helpers/evaluateSafely"
import CPU from "./classes/CPU"

const filename: string = process.argv[2]

const fileContent: string = evaluateSafely({ 
    fn: () => {
        const filePath: string = path.resolve(filename.trim())
        return readFileSync(filePath)
    }, 
    errorMsg: `ERROR unable to open file ${filename} (ENOENT: no such file or directory, open '${filename}')`
})

const lines: string[] = fileContent.split("\n")

const instructions = lines.map(CPU.parseLine)

