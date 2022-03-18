import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Post {
    id?: string;
    title?: string;
    author?: string;
    content?: string;
    image?: string;
    category?: string;
    published: Timestamp<any>;
}
