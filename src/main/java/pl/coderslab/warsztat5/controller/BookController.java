package pl.coderslab.warsztat5.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.coderslab.warsztat5.model.Book;
import pl.coderslab.warsztat5.model.BookService;

@RestController
@RequestMapping("/books") // ze slajdów z tabelki
public class BookController {
	@Autowired
	private BookService bookService;
	
	@GetMapping("/test")
	public String test() {
		return "{test:ok}"; //przykładowy json (pierszy stworzony json)
	}
	
	@GetMapping("/jackson")
	public Book helloBook(){		
		return new Book(1L,"9788324631766","Thinking in Java", "Bruce Eckel","Helion", "programming"); 
		//1L - jeśli po liczbie jest L to 1 interpretowane jest jako long. F -float (literał)
		}
	@GetMapping("")
	public List<Book> getBooks(){
		return this.bookService.getList();
	}
	@DeleteMapping("/{id}")
	public String deleteBook(@PathVariable long id) {
		this.bookService.deleteById(id); //tą metode musze sobie sam zrobic
		return "{status: ok}";
	}

}
