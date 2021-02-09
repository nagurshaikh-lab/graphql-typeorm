import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { UnitInfo } from "./unit-info";



@Entity( { name: 'UnitWithStatus' } )
@ObjectType()
export class StorageType extends BaseEntity {
    @Field( () => String )
    @PrimaryGeneratedColumn( 'uuid' )
    id: string;

    @Field( () => String )
    @Column( { name: 'Value' } )
    storageType: string;

    @Field( () => String )
    @Column()
    clientId: string;

    @Column( { name: 'IsDeleted' } )
    deleted: Boolean;

    @Field( () => [UnitInfo], { nullable: true } )
    @OneToMany( () => UnitInfo, unit => unit.building )
    @JoinColumn( { referencedColumnName: "storageTypeID" } )
    units?: UnitInfo[];
}