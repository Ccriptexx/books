import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../auth/enums/role.enum';
import { Roles } from "../auth/decorators/roles.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) {}
	
	@Post()
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(RoleEnum.Admin)
	addBook(@Body() createBookDto: CreateBookDto) {
		return this.booksService.addBook(createBookDto);
	}
	
	@Get()
	getAllBooks() {
		return this.booksService.getAllBooks();
	}
	
	@Get(':id')
	getBookById(@Param('id') id: string) {
		return this.booksService.getBookById(id);
	}
	
	@Put(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(RoleEnum.Admin)
	updateBook(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
		return this.booksService.updateBook(id, updateBookDto);
	}
	
	@Delete(':id')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(RoleEnum.Admin)
	deleteBook(@Param('id') id: string) {
		return this.booksService.deleteBook(id);
	}
}