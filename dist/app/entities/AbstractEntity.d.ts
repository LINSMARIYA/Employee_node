import { BaseEntity } from "typeorm";
export declare class AbstractEntity extends BaseEntity {
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
