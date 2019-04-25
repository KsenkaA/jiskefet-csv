import 'reflect-metadata';
import {createConnection} from 'typeorm';
// @ts-ignore

createConnection().then(async connection => {
    console.log('success');
}).catch(error => console.log(error));
