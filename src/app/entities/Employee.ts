import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Address } from "./Address";
import { Department } from "./Department";


@Entity("employee")
    export class Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;
        @Column({ nullable: true })
        public username: string;
        @Column({ nullable: false })
        public role: string;
        @Column({ nullable: false })
        public status: string;
        @Column({ nullable: false })
        public experience: string;
        @Column({ nullable: false })
        public dateOfJoining: string;
        @Column({ nullable: false,default:"password" })
        public password:string;
        
        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;
        @Column({ nullable: false })
        public departmentId: string;

        @OneToOne(() => Address, {cascade: true})
        @JoinColumn()
        public address: Address;
        @Column({nullable: false})
        public addressId: string;
}