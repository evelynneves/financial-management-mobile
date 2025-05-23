/******************************************************************************
*                                                                             *
* Creation Date : 16/04/2025                                                  *
*                                                                             *
* Property : (c) This program, code or item is the Intellectual Property of   *
* Evelyn Neves Barreto. Any use or copy of this code is prohibited without    *
* the express written authorization of Evelyn. All rights reserved.           *
*                                                                             *
*******************************************************************************/

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

export async function updateUserBalance(uid: string, delta: number) {
    const db = getFirestore();
    const summaryRef = doc(db, "users", uid, "summary", "totals");

    const snap = await getDoc(summaryRef);
    const currentBalance = snap.exists() ? snap.data()?.balance || 0 : 0;

    const newBalance = currentBalance + delta;

    await setDoc(summaryRef, { balance: newBalance }, { merge: true });
}

export async function getUserBalance(uid: string): Promise<number> {
    const db = getFirestore();
    const summaryRef = doc(db, "users", uid, "summary", "totals");

    const snap = await getDoc(summaryRef);
    return snap.exists() ? snap.data()?.balance || 0 : 0;
}
