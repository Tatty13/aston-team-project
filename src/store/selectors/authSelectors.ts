import { RootState } from "..";

export const uid = (state: RootState) => state.auth.uid;
export const email = (state: RootState) => state.auth.email;
export const status = (state: RootState) => state.auth.statusAuth;