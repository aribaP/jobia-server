import { jobDescription } from "src/job-description/entity/job-description.entity";
import { resume } from "src/resume/entity/resume.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class score{

    @PrimaryGeneratedColumn()
    scoreId: number

    @Column({ type: 'numeric', precision: 65, scale: 2 })
    score: number

    @Column()
    jdId: number

    @Column()
    resId: number

    @ManyToOne(() => jobDescription, (jdFK) => jdFK.scores,{
        onDelete: 'CASCADE',
    })
    @JoinTable()
    jdFK!: jobDescription

    @ManyToOne(() => resume, (resFK) => resFK.scores,{
        onDelete: 'CASCADE',
    })
    @JoinTable()
    resFK!: resume

}