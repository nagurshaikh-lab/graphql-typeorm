import { Field, ObjectType } from "type-graphql";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity, Entity } from "typeorm";
import { Building } from "./building";
import { StorageType } from "./storage-type";
import { UnitType } from "./unit-type";

@Entity({ name: 'UnitDetails' })
@ObjectType()
export class UnitInfo extends BaseEntity {
    @Field(() => String)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column()
    unitNumber: string;

    @Column({ name: 'deleted' })
    deleted: Boolean;

    @Column()
    clientId: string;

    @Column()
    buildingId: string;

    @Column()
    storageTypeID: string;

    @Column()
    unitTypeID: string;

    @Field(() => Building)
    @ManyToOne(() => Building, building => building.units)
    @JoinColumn({ referencedColumnName: "id" })
    building?: Building;

    @Field(() => StorageType)
    @ManyToOne(() => StorageType, s => s.units)
    @JoinColumn({ referencedColumnName: "id" })
    storageType?: StorageType;

    @Field(() => UnitType)
    @ManyToOne(() => UnitType, u => u.units)
    @JoinColumn({ referencedColumnName: "id" })
    unitType?: UnitType;
}