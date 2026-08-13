const fs = require('fs');
let code = fs.readFileSync('lib/firebase.ts', 'utf8');
code = code.replace(/import { getFirestore, Firestore } from 'firebase\/firestore';/, "import { getFirestore, initializeFirestore, Firestore } from 'firebase/firestore';");
code = code.replace(/db = getFirestore\(app\);/, "db = initializeFirestore(app, { experimentalForceLongPolling: true });");
fs.writeFileSync('lib/firebase.ts', code);
