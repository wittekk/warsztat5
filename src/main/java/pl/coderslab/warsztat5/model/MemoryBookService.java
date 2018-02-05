package pl.coderslab.warsztat5.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component  // component czyli zarządzany przez springa
public class MemoryBookService implements BookService {
	private List<Book> list;

	public MemoryBookService() {
		list = new ArrayList<>();
		list.add(new Book(1L, "9788324631766", "Thinking	in	Java", "Bruce	Eckel", "Helion", "programming"));
		list.add(new Book(2L, "9788324627738", "Rusz	glowa,	Java.", "Sierra	Kathy,	Bates	Bert", "Helion",
				"programming"));
		list.add(new Book(3L, "9780130819338", "Java	2.	Podstawy", "Cay	Horstmann,	Gary	Cornell", "Helion",
				"programming"));
	}

	/* (non-Javadoc)
	 * @see pl.coderslab.warsztat5.model.BookService#getList()
	 */
	@Override
	public List<Book> getList() {
		return list;
	}

	/* (non-Javadoc)
	 * @see pl.coderslab.warsztat5.model.BookService#setList(java.util.List)
	 */
	@Override
	public void setList(List<Book> list) {
		this.list = list;
	}

	/* (non-Javadoc)
	 * @see pl.coderslab.warsztat5.model.BookService#deleteById(long)
	 */
	@Override
	public void deleteById(long id) {
		
		for (int i=0; i<list.size(); i++) {
			if(list.get(i).getId()==id) {
				list.remove(i);
			}
		}
		// TODO Auto-generated method stub
		//znalezc ksiazke o takim id i ją usunąć		
	}
}
