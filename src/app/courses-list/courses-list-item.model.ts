export interface ICoursesListItem {
    id: number;
    name: string;
    date: Date | string;
    length: number;
    description: string;
    isTopRated: boolean;
    authors: string;
}
