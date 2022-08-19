import { resume } from "src/resume/entity/resume.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()                          // typeORM Decorator
export class candidate{
    @PrimaryGeneratedColumn('increment')
    candId: number

    @Column({nullable: false})
    candName: string

    @Column({nullable: false, unique: true})
    candEmail: string

    @Column({nullable: false})
    candPassword: string

    @Column({nullable: true, unique: true})
    candContactNumber: string

    @Column({nullable: true})
    candCity: string

    @Column({nullable: true})
    candAddress: string

    @Column({nullable: true, unique: true})
    candCNIC: string

    @OneToOne(() => resume, (resFK) => resFK.candFK) // specify inverse side as a second parameter
    resFK: resume
    
}



// {
//     "candId": 1,
//     "candName": "Ariba Mehdi",
//     "candEmail": "ariba.mehdi2001@gmail.com",
//     "candPassword": "ariba",
//     "candContactNumber": "03333333333",
//     "candCity": "Karachi",
//     "candAddress": "FB Area",
//     "candCNIC": "4444444444444"
// }