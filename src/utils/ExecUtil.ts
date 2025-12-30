/**
 * ═════════════════════════════════════════════════════════════
 * 📄 FILE     : excUtil.ts
 * 📁 PACKAGE  : excUtil-
 * 👤 AUTHOR   : stz
 * 🕒 CREATED  : 25. 12. 15.
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 📝 DESCRIPTION
 *   -
 * ═════════════════════════════════════════════════════════════
 * ═════════════════════════════════════════════════════════════
 * 🔄 CHANGE LOG
 *   - DATE : 2025/12/15 | Author : stz | 최초 생성
 * ═════════════════════════════════════════════════════════════
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

export class ExecUtil {
    
    
    public static execute(command : string) : void {
        execSync(command, { stdio: 'inherit' });
    }
    
    public static mkDir(dirPath : string, options : string = '-p') : void {
        this.execute(`mkdir ${options} ${dirPath}`);
    }

    public static rmDir(dirPath : string, options : string = '-rf') : void {
        this.execute(`rm ${options} ${dirPath}`);
    }

    public static copyFile(source : string, dest : string, options : string = '-r') : void {
        this.execute(`cp ${options} ${source} ${dest}`);
    }

    public static moveFile(source : string, dest : string, options : string = '') : void {
        const optStr = options ? `${options} ` : '';
        this.execute(`mv ${optStr}${source} ${dest}`);
    }

    public static exists(path : string) : boolean {
        try {
            execSync(`test -e ${path}`, { stdio: 'ignore' });
            return true;
        } catch {
            return false;
        }
    }

    public static async readFile(filePath : string) : Promise<string> {
        return await fsPromises.readFile(filePath, 'utf-8');
    }

    public static async readJson<T = Record<string, unknown>>(filePath : string) : Promise<T> {
        const content = await this.readFile(filePath);
        return JSON.parse(content) as T;
    }

    public static listFiles(dir : string) : string[] {
        if (!fs.existsSync(dir)) {
            return [];
        }
        return fs.readdirSync(dir).map(file => path.join(dir, file));
    }

    public static findFiles(pattern : string, dir : string = '.') : string[] {
        try {
            const result = execSync(`find ${dir} -name "${pattern}" -type f`, {
                encoding: 'utf-8',
                stdio: ['pipe', 'pipe', 'ignore']
            });
            return result.trim().split('\n').filter(line => line.length > 0);
        } catch {
            return [];
        }
    }

}