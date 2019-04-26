import { Controller, Get, Param, Res } from '@nestjs/common';
import 'reflect-metadata';
import { getManager } from 'typeorm';
import { Log } from '../entity/log.entity';
import { Run } from '../entity/run.entity';
import { User } from '../entity/user.entity';
import { SubSystem } from '../entity/sub_system.entity';
import { log } from 'util';
import { Response } from 'express';

@Controller('csv')
export class CsvController {
    @Get()
    findAll(): string {
        return 'Pass colDelimiter, decDelimiter, dateFrom and dateTo to get a csv file';
    }
    @Get('colDelimiter=:colDelimiter&tableName=:tableName&columns=:columns')
    make_csv(@Param() params, @Res() res: Response): string {
        let repository;
        let table = params.tableName;
        if (table === 'log' || table === 'Log') {
            repository = getManager().getRepository(Log);
        } else if (table === 'Run' || table === 'run') {
            repository = getManager().getRepository(Run);
        } else if (table === 'User' || table === 'user') {
            repository = getManager().getRepository(User);
        } else if (table === 'SubSystem' || table === 'subSystem') {
            repository = getManager().getRepository(SubSystem);
        }
        const colDelimiter = params.colDelimiter;
        let columns = params.columns.split(',');
        let data1 = [columns];
        let str = [];
        let result = repository.find({ select: columns });
        result.then(
            responses => {
                for (let response of responses) {
                    str = [];
                    for (let value of (Object as any).values(response)) {
                        str.push(value.toString());
                    }
                    data1.push(str);
                }
                const fastcsv = require('fast-csv');
                const fs = require('fs');
                const ws = fs.createWriteStream('out.csv');

                fastcsv
                    .write(data1, {
                        headers: true,
                        delimiter: colDelimiter,
                    })
                    .pipe(ws);
            },
        );
        res.download('out.csv');
        return 'CSV is ready to upload!';
    }
}
