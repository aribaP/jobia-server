import { IsNotEmpty } from "class-validator";
import { organization } from "src/organization/entity/organization.entity";
import { score } from "src/score/entity/score.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()                          // typeORM Decorator
export class jobDescription{
    @PrimaryGeneratedColumn()
    jdId: number

    @Column({nullable: false})
    jdPosition: string

    @Column({nullable: false})
    jdMinimumExperience: number

    @Column("longtext")
    jdRequiredSkills: string

    @Column({nullable: false})
    jdLocation: string

    @Column({nullable: false})
    jdCity: string

   // foreign key : orgID
    @IsNotEmpty()
    @ManyToOne(() => organization, (orgFK) => orgFK.jdFK,{
        onDelete: 'CASCADE'
    } )// specify inverse side as a second parameter
    @JoinColumn()
    orgFK: organization 

    @OneToMany(() => score, scores => scores.jdFK,{
        cascade: ['insert', 'update'],
    })
    public scores!: score[];

}


