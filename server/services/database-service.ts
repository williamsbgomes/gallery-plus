import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import type { Database } from "../models";

export class DatabaseService {
	private dbPath: string;
	private dataDir: string;

	constructor() {
		this.dataDir = resolve(process.cwd(), "data");
		this.dbPath = join(this.dataDir, "db.json");
	}

	async initialize(): Promise<void> {
		await this.ensureDataDirExists();
		await this.ensureDbExists();
	}

	private async ensureDataDirExists(): Promise<void> {
		if (!existsSync(this.dataDir)) {
			await mkdir(this.dataDir, { recursive: true });
		}
	}

	private async ensureDbExists(): Promise<void> {
		if (!existsSync(this.dbPath)) {
			const initialData: Database = {
				photos: [],
				albums: [],
				photosOnAlbums: [],
			};
			await this.writeDatabase(initialData);
		}
	}

	async readDatabase(): Promise<Database> {
		try {
			const data = await readFile(this.dbPath, "utf8");
			return JSON.parse(data);
		} catch (error) {
			console.error("Error reading database:", error);
			const emptyDb: Database = {
				photos: [],
				albums: [],
				photosOnAlbums: [],
			};
			await this.writeDatabase(emptyDb);
			return emptyDb;
		}
	}

	async writeDatabase(data: Database): Promise<void> {
		try {
			await writeFile(this.dbPath, JSON.stringify(data, null, 2));
		} catch (error) {
			console.error("Error writing database:", error);
			throw new Error("Failed to write to database");
		}
	}
}
