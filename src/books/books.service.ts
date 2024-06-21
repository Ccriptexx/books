import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
	constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}
	
	async addBook(createBookDto: CreateBookDto): Promise<Book> {
		const newBook = new this.bookModel(createBookDto);
		return await newBook.save();
	}
	
	async getAllBooks(): Promise<Book[]> {
		return await this.bookModel.find().exec();
	}
	
	async getBookById(id: string): Promise<Book> {
		return await this.bookModel.findById(id).exec();
	}
	
	async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
		return await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
	}
	
	async deleteBook(id: string): Promise<Book> {
		return await this.bookModel.findByIdAndDelete(id).exec();
	}
}