import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class scoreCreateDto{

    @Column({ type: 'numeric', precision: 65, scale: 2 })
    score: number

    @Column()
    jdId: number

    @Column()
    resId: number

    
}