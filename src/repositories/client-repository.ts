import { Resolver, Query, Arg } from "type-graphql";
import { Connection, createConnection, getConnection } from "typeorm";

import { CaddyClient } from "../entities/client-entities/caddy-client";
import { Building } from "../entities/facility-info/building";
import { Location } from '../entities/facility-info/location';
import { StorageType } from "../entities/facility-info/storage-type";
import { UnitInfo } from "../entities/facility-info/unit-info";
import { UnitType } from "../entities/facility-info/unit-type";
import { UnitsRequest } from "../request-models/units-request";
import { SignUpInsights } from "../response-models/signup-upgrade-resposne";

@Resolver()
export class CaddyClientRepository {

  private _connection: Connection;
  /**
   *
   */
  constructor() {
    this._connection = getConnection("default");
  }

  @Query(() => [CaddyClient])
  clients() {
    return CaddyClient.find({order: { accountId:"DESC" }});
  }

  @Query(() => CaddyClient, { name: 'account' })
  client(@Arg("accountId", { nullable: true }) accountId?: Number, @Arg("clientId", { nullable: true }) clientId?: String) {
    return CaddyClient.findOne({ where: [{ accountId, deleted: false }, { clientId, deleted: false }], cache: true, relations: ['locations'] });
  }

  @Query(() => [StorageType], { name: 'storageTypes' })
  storageTypes(@Arg('clientId') clientId: String) {
    return StorageType.find({ where: { clientId: clientId, deleted: false }, cache: true, relations: ['units'] });
  }

  @Query(() => [Location], { name: 'location' })
  locations(@Arg('clientId') clientId: String) {
    return Location.find({ where: { clientId: clientId, deleted: false }, cache: true, relations: ['buildings'] });
  }

  @Query(() => [Building], { name: 'building' })
  buildings(@Arg('locationId') locationId: String) {
    return Building.find({ where: { locationId: locationId, deleted: false }, cache: true, relations: ['location', 'units'] });
  }

  @Query(() => [UnitType], { name: 'unitTypes' })
  unitTypes(@Arg('clientId') clientId: String) {
    return UnitType.find({ where: { clientId: clientId, deleted: false }, cache: true, relations: ['units'] });
  }

  @Query(() => [UnitInfo], { name: 'units' })
  units(@Arg("request", { nullable: true, validate: true }) request: UnitsRequest) {
    return UnitInfo.find({
      where: [
        { storageTypeID: request.storageTypeId, deleted: false, clientId: request.clientId },
        { unitTypeID: request.unitTypeId, deleted: false },
        { buildingId: request.buildingId, deleted: false },
      ],
      cache: true, relations: ['building', 'storageType', 'unitType']
    });
  }

  @Query(() => [SignUpInsights], { name: 'signupInsights' })
  async getSignUpDetails(@Arg('year') year: Number): Promise<SignUpInsights[]> {
    debugger;
    let data = await this._connection.manager.query('EXECUTE usp_gp_v1_SignUpsInfo_get @0', [year]) as Promise<SignUpInsights[]>;
    // .then((dataset:any):Promise<SignUpInsights[]> => {
    //   return dataset as Promise<SignUpInsights[]>;
    // });
    console.log(data);
    return data;
  }
}