import { IUser } from "./IUser";

export interface IComment {
    id: number,
    body: string,
    postId: number,
    user: IUser
};

export type IComments = IComment[]; 

export const initialComments = [];