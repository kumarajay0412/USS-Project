import { atom } from 'recoil';

export const defaultUserState = {
    loggedIn: false,
    user: '',
}

export const UserAtom = atom({
    key: "UserAtom",
    default: defaultUserState
});



