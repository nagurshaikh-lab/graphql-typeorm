import { Field, InputType, ObjectType } from "type-graphql";

import { MaxLength, Length } from "class-validator";
import { BaseEntity, Column } from "typeorm";


@ObjectType()
export class SignUpInsights extends BaseEntity {
    @Field(() => Number, { name:'month' })
    @Column({ name: 'month' })
    Month?: number;

    @Field(() => String, { name:'monthName' })
    @Column({ name: 'MonthName' })
    MonthName?: string;

    @Field(() => Number, { name:'signups' })
    @Column({ name: 'Signups' })
    Signups?: number;

    @Field(() => Number, { name:'active' })
    @Column({ name: 'Active' })
    Active?: number;

    @Field(() => Number, { name:'upgrades' })
    @Column({ name: 'Upgrades' })
    Upgrades?: number;
    
    @Field(() => Number, { name:'signupVsUpgrades' })
    @Column({ name: 'SignupVsUpgrades' })
    SignupVsUpgrades:number;
}