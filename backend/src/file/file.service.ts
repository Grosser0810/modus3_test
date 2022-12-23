import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {

    createFile(file) {
        try {
            const fileExtension = file.originalname.split('.').pop();
            const fileName = `${uuid.v4()}.${fileExtension}`;
            const filePath = path.resolve(__dirname, '..', 'static');

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true })
            }
            fs.writeFileSync(path.resolve(filePath, fileName), file.buffer)
            return fileName;
        } catch (e) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
