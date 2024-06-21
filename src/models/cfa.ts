import { Database } from 'bun:sqlite'

export type CFA = {
    id?: number,
    name: string,
    number: string,
}

export const tableCFA = (): string => {
    return `
        CREATE TABLE IF NOT EXISTS CFA (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name VARCHAR(255) NOT NULL,
            Number VARCHAR(50) NOT NULL
        );
    `;
}

export const createCFA = (db: Database, cfa: CFA): number => {
    const sql = `
        INSERT INTO CFA (Name, Number) 
        VALUES (?, ?);
    `;
    db.run(sql, [cfa.name, cfa.number]);
    const result: any = db.query("SELECT last_insert_rowid() as id").get();
    return result.id;
}

export const getAllCFA = (db: Database): CFA[] => {
    const sql = `
        SELECT id, Name as name, Number as number
        FROM CFA;
    `;
    const statement = db.query(sql);
    return statement.all() as CFA[]
}