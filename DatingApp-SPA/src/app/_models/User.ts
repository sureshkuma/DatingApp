import {Photo} from './Photo';
export interface User {
    id: number;
    username: string;
    KnownAs: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: string;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingfor?: string;
    photos?: Photo[];
}
