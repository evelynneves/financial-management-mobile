import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

/**
 * Atualiza o saldo do usuário, somando/subtraindo o delta ao saldo atual.
 * Armazena o saldo em: users/{uid}/summary/totals
 */
export async function updateUserBalance(uid: string, delta: number) {
    const db = getFirestore();
    const summaryRef = doc(db, "users", uid, "summary", "totals");

    const snap = await getDoc(summaryRef);
    const currentBalance = snap.exists() ? snap.data()?.balance || 0 : 0;

    const newBalance = currentBalance + delta;

    await setDoc(summaryRef, { balance: newBalance }, { merge: true });
}

/**
 * Retorna o saldo total salvo do usuário.
 */
export async function getUserBalance(uid: string): Promise<number> {
    const db = getFirestore();
    const summaryRef = doc(db, "users", uid, "summary", "totals");

    const snap = await getDoc(summaryRef);
    return snap.exists() ? snap.data()?.balance || 0 : 0;
}
