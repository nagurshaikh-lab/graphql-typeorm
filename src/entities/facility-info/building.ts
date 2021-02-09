import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { ManyToOne } from "typeorm";

import { Location } from '../facility-info/location';
import { UnitInfo } from "./unit-info";

@Entity( { name: 'BuildingDetails' } )
@ObjectType()
export class Building extends BaseEntity {
    @Field( () => String )
    @PrimaryGeneratedColumn( 'uuid' )
    id: string;

    @Field( () => String )
    @Column()
    buildingname: string;


    @Field( () => String )
    @Column()
    locationId: string;

    @Column( { name: 'deleted' } )
    deleted: Boolean;


    @Field( () => Location )
    @ManyToOne( () => Location, loc => loc.buildings )
    @JoinColumn( { referencedColumnName: "id" } )
    location?: Location;

    @Field( () => [UnitInfo], { nullable: true } )
    @OneToMany( () => UnitInfo, unit => unit.building )
    @JoinColumn( { referencedColumnName: "buildingId" } )
    units?: UnitInfo[];
}