import { Field, InputType } from "type-graphql";

import { MaxLength, Length } from "class-validator";


@InputType()
export class UnitsRequest {
    @Field()
    clientId: string;
    @Field()
    storageTypeId: string;
    @Field()
    locationId: string;
    @Field()
    buildingId: string;
    @Field()
    unitTypeId: string;
}