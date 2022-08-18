import { resume } from "src/resume/entity/resume.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class resumeProjects{
    
    @PrimaryGeneratedColumn()
    projId: number

    @Column({nullable: true})
    projTitle: String

    @Column("longtext")
    projDescription: String

    // resumeID foriegn key
    @ManyToOne(() => resume, (resFK) => resFK.projFK,{
        onDelete: 'CASCADE'
    }) // specify inverse side as a second parameter
    @JoinColumn()
    resFK: resume
}   