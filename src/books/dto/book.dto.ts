import { IsDateString, IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';

export class CreateBookDto {
	@IsString()
	readonly title: string;
	
	@IsString()
	readonly author: string;
	
	@IsDateString()
	readonly publicationDate: string;
	
	@IsArray()
	@ArrayNotEmpty()
	@IsString({ each: true })
	readonly genres: string[];
}

export class UpdateBookDto {
	@IsString()
	@IsOptional()
	readonly title?: string;
	
	@IsString()
	@IsOptional()
	readonly author?: string;
	
	@IsDateString()
	@IsOptional()
	readonly publicationDate?: string;
	
	@IsArray()
	@IsOptional()
	@IsString({ each: true })
	readonly genres?: string[];
}