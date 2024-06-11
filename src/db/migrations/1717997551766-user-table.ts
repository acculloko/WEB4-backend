import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1717997551766 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.query(`
            CREATE TABLE "user" (
                id uuid NOT NULL default uuid_generate_v4(),
                name varchar(256) NOT NULL,
                email varchar(256) NOT NULL,
                password varchar(256) NOT NULL,
                purchases text,
                CONSTRAINT user_pk_id PRIMARY KEY (id),
                CONSTRAINT user_un_email UNIQUE (email)
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user;`)
    }
    
}
