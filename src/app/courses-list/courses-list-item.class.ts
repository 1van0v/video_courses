import { ICoursesListItem } from './courses-list-item.model';

export class CoursesListItem implements ICoursesListItem {
    public id: number;
    public title: string;
    public creationDate: number;
    public duration: number;
    public description: string;
}
