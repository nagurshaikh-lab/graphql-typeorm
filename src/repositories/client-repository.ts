import { Resolver, Query, Arg } from "type-graphql";
import { Connection, getConnection } from "typeorm";

import { Client } from "../entities/client-entities/client";
import { Building } from "../entities/facility-info/building";
import { Location } from '../entities/facility-info/location';

@Resolver()
export class CaddyClientRepository {

  private _connection: Connection;
  /**
   *
   */
  constructor() {
    this._connection = getConnection("default");
  }

  @Query(() => [Client])
  clients() {
    return Client.find({order: { accountId:"DESC" }});
  }

  @Query(() => Client, { name: 'account' })
  client(@Arg("accountId", { nullable: true }) accountId?: Number, @Arg("clientId", { nullable: true }) clientId?: String) {
    return Client.findOne({ where: [{ accountId, deleted: false }, { clientId, deleted: false }], cache: true, relations: ['locations'] });
  }


  @Query(() => [Location], { name: 'location' })
  locations(@Arg('clientId') clientId: String) {
    return Location.find({ where: { clientId: clientId, deleted: false }, cache: true, relations: ['buildings'] });
  }

  @Query(() => [Building], { name: 'building' })
  buildings(@Arg('locationId') locationId: String) {
    return Building.find({ where: { locationId: locationId, deleted: false }, cache: true, relations: ['location', 'units'] });
  }
}