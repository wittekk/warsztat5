package pl.coderslab.warsztat5.model;

import java.util.List;

public interface BookService {

	List<Book> getList();

	void setList(List<Book> list);

	void deleteById(long id);

}