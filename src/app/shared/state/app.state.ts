
import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "../../auth/pages/state/reducers/auth.reducer";
import { AuthState } from "../../auth/pages/interfaces/authLogin.interface";

export interface AppState {
    authState: AuthState

}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    authState: authReducer
}