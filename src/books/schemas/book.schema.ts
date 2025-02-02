import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
	@Prop({ required: true })
	title: string;
	
	@Prop({ required: true })
	author: string;
	
	@Prop()
	publicationDate: Date;
	
	@Prop([String])
	genres: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);