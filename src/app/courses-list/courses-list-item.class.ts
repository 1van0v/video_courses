import { ICoursesListItem } from './courses-list-item.model';

export class CoursesListItem implements ICoursesListItem {
    public id: number;
    public name: string;
    public date: Date | string;
    public length: number;
    public description: string;
    public isTopRated: boolean;
    public authors: string;
}
