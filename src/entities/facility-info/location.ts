import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { CaddyClient } from '../client-entities/caddy-client';
import { ManyToOne } from "typeorm";
import { Building } from "./building";

@Entity( { name: 'Location' } )
@ObjectType()
export class Location extends BaseEntity {
    @Field( () => String )
    @PrimaryGeneratedColumn( 'uuid' )
    id: string;

    @Field( () => String )
    @Column()
    clientId: string;

    @Field( () => String )
    @Column()
    location: string;

    @Field( () => String, { nullable: true } )
    @Column( { name: 'LocAddress' } )
    locationAddress: string;

    @Column( { name: 'deleted' } )
    deleted: Boolean;

    @Field( () => CaddyClient )
    @ManyToOne( () => CaddyClient, Client => Client.locations )
    @JoinColumn( { name: "clientId" } )
    caddyClient: CaddyClient;

    @Field( () => [Building] )
    @OneToMany( () => Building, building => building.location )
    @JoinColumn( { referencedColumnName: "locationId" } )
    buildings: Building[];
}