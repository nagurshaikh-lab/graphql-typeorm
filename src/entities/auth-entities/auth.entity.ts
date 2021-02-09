import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import { CaddyClient } from "../client-entities/caddy-client";

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

    @ManyToOne(() => CaddyClient, Client => Client.locations)
    @JoinColumn({ name: "clientId" })
    caddyClient: CaddyClient;
}