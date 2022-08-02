import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";
export declare class Department extends AbstractEntity {
    id: string;
    name: string;
    employee: Employee[];
}
