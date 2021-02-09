// import { AuthTokenDetails } from "../entities/auth-entities/auth.entity";

// export class Auth {
//     /**
//      *
//      */
//     constructor() {

//     }

//     async authenticateClient(accessTokenHeader: string): Promise<string> {

//         accessTokenHeader = accessTokenHeader.substring("Bearer ".length, accessTokenHeader.length);

//         let tokenDetail = AuthTokenDetails.findOne({ where: { accessToken: accessTokenHeader, rowStatus: 'A' }, cache: true, relations: ['caddyClient'] });

//         return (await tokenDetail).clientId;
//     }
// }