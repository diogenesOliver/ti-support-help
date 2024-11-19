import fs from 'fs'
import path from 'path'

export function apiLogs() {
    return fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' })
}