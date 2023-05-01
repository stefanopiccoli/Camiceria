import admin from "firebase-admin";
import serviceAccount from '../config/SDKAdminKey.json' assert {type: "json"};
import dotenv from "dotenv";


dotenv.config();

// const conf = {
//   type: serviceAccount.type,
//   project_id: serviceAccount.project_id,
//   private_key_id: serviceAccount.private_key_id,
//   private_key: serviceAccount.private_key,
//   client_email: serviceAccount.client_email,
//   client_id: serviceAccount.client_id,
//   auth_uri: serviceAccount.auth_uri,
//   token_uri: serviceAccount.token_uri,
//   auth_provider_x509_cert_url: serviceAccount.auth_provider_x509_cert_url,
//   client_x509_cert_url: serviceAccount.client_x509_cert_url,
// };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any)
});


export default admin;
