import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import { Client } from "../client-entities/client";

@Entity({ name: 'TenantAuthTokenDetails' })
export class AuthTokenDetails extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    clientId: string;

    @Column()
    accessToken: string;

    @Column({ name: 'RowStatus' })
    rowStatus: string;

}