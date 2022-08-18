import { resume } from "src/resume/entity/resume.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class resumeEducation{
    
    @PrimaryGeneratedColumn()
    eduId: number

    @Column({nullable: true})
    eduEndYear: number

    @Column({nullable: true})
    eduInstituteName: String

    @Column({nullable: true})
    eduDegree: String

    // resumeID foriegn key
    @ManyToOne(() => resume, (resFK) => resFK.eduFK,{
        onDelete: 'CASCADE'
    }) // specify inverse side as a second parameter
    @JoinColumn()
    resFK: resume
}   