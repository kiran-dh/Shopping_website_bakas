import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./firebase-service-account.json" with { type: "json" };

if (!getApps().length) {
    initializeApp({
        credential: cert(serviceAccount),
    });
}

export { getAuth };