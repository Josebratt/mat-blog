export interface Roles {
    reader?: boolean;
    author?: boolean;
    admin?: boolean;
}

export interface User {
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    role?: Roles;
}


