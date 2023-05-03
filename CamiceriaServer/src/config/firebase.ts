import admin, { ServiceAccount } from "firebase-admin";
// import serviceAccount from '../../' assert {type: "json"};
import dotenv from "dotenv";

dotenv.config();

const cred: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  privateKey: process.env.PRIVATE_KEY,
  clientEmail: process.env.CLIENT_EMAIL,
};

// const cred : ServiceAccount = {
//   type : process.env.TYPE,
//   project_id : process.env.PROJECT_ID,
//   private_key_id : process.env.PRIVATE_KEY_ID,
//   private_key : process.env.PRIVATE_KEY,
//   client_email : process.env.CLIENT_EMAIL,
//   client_id : process.env.CLIENT_ID,
//   auth_uri : process.env.AUTH_URI,
//   token_uri : process.env.TOKEN_URI,
//   auth_provider_x509_cert_url : process.env.AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url : process.env.CLIENT_X509_CERT_URL,
// }

admin.initializeApp({
  credential: admin.credential.cert(cred),
});

export default admin;
