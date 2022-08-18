import { candidate } from "src/candidate/entity/candidate.entity";
import { score } from "src/score/entity/score.entity";
import { resumeEducation } from "src/resume-education/entity/resume-education.entity";
import { resumeExperience } from "src/resume-experience/entity/resume-experience.entity";
import { resumeProjects } from "src/resume-projects/entity/resume-projects.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class resume{
    @PrimaryGeneratedColumn()
    resId: number

    @Column("longtext")
    careerObjective: string

    @Column({nullable: true})
    position: string

    @Column({nullable: true})
    skills: string

    @Column({nullable: true})
    linkedIn: string

    @Column({nullable: true})
    gitHub: string

    @OneToOne(() => candidate, (candFK) => candFK.resFK, {
        onDelete: 'CASCADE'
    }) // specify inverse side as a second parameter
    @JoinColumn()
    candFK: candidate
    // education, experience, project

    @OneToMany(() => resumeEducation, (eduFK) => eduFK.resFK, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    }) // specify inverse side as a second parameter
    eduFK: resumeEducation[]

    @OneToMany(() => resumeExperience, (expFK) => expFK.resFK, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    }) // specify inverse side as a second parameter
    expFK: resumeExperience[]

    @OneToMany(() => resumeProjects, (projFK) => projFK.resFK,  {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        
        eager: true,
    }) // specify inverse side as a second parameter
    projFK: resumeProjects[]

    @OneToMany(() => score, scores => scores.resFK,{
        cascade: ['insert', 'update'],
    })
    public scores!: score[];
}   