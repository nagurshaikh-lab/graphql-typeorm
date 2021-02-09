import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { Location } from '../facility-info/location';

@Entity({ name: 'CaddyClientDetail' })
@ObjectType()
export class CaddyClient extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  clientId: string;

  @Field(() => Number)
  @Column()
  accountId: number;

  @Field(() => String)
  @Column()
  clientName: string;

  @Field(() => String)
  @Column()
  emailId: string;

  @Field(() => String, { nullable: true })
  @Column({ name: 'ContactNumber' })
  phoneNumber?: string;

  @Field(() => Date)
  @Column({ name: 'Createddate' })
  signedUpDate: Date;

  @Column({ name: 'IsActive' })
  deleted: Boolean;

  @Field(() => [Location])
  @OneToMany(() => Location, loc => loc.caddyClient)
  @JoinColumn({ referencedColumnName: "clientId" })
  locations: Location[];
}