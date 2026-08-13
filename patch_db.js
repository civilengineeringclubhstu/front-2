const fs = require('fs');

let code = fs.readFileSync('lib/db.ts', 'utf8');

const oldFunc = `export async function getAllLeadershipMembers() {
  if (!db) return [];
  const q = query(collection(db, "leadership_members"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}`;

const newFunc = `export async function getAllLeadershipMembers(category?: string) {
  if (!db) return [];
  let q;
  if (category) {
    // If we have a category, filter by it. We might need an index for this if we orderBy createdAt.
    // For simplicity without assuming index, we fetch all and filter in memory, or we just query by category without ordering.
    // Let's filter in memory for now to avoid requiring composite indexes on firestore.
    const snap = await getDocs(query(collection(db, "leadership_members"), orderBy("createdAt", "desc")));
    let docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    return docs.filter(d => d.category && d.category.toLowerCase() === category.toLowerCase());
  } else {
    q = query(collection(db, "leadership_members"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}`;

code = code.replace(oldFunc, newFunc);
fs.writeFileSync('lib/db.ts', code);
