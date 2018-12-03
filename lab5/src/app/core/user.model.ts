export class FirebaseUserModel {
    image: string;
    name: string;
    provider: string;
    isAdmin: boolean;
  
    constructor(){
      this.image = "";
      this.name = "";
      this.provider = "";
    }
  }
  //  Firebase Authentication sources used
//   https://github.com/AngularTemplates/firebase-authentication-with-angular-5

// https://angular-templates.io/tutorials/about/firebase-authentication-with-angular?fbclid=IwAR2BLHKp-FbK40yG9pTvU_96bgHduq10vmgHCM7FSVKbdEay8UYP8j7wcKs 