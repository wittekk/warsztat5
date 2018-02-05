// GET PART

$(document).ready(function() {
	var bookList = $('#bookList');
	
	$.ajax({
		url : "http://localhost:8080/warsztat5/books",
		type : "GET"
	}).done(function(books) {
		for (var book of books) {
			var p = $('<p>').text(book.title);
			p.attr('id',book.id);
			p.appendTo(bookList);
			
			var div = $('<div>');
			div.appendTo(bookList);
			div.slideUp("slow");
			
			
			p.on('click', function() {
				var clickedElem = $(this);	
				
				$.ajax({
					url : "http://localhost:8080/warsztat5/books/" + $(this).attr('id'),
				}).done(function(idContent) {
					// dodanie opisu książki
					var txt = "";
					for (var idItem in idContent) {
						txt += (idContent[idItem] + "<br>");	
					};
					clickedElem.next().append(txt);
					
					// dodanie formularza edycji książki
					var id = idContent.id;
					var isbn = idContent.isbn;
					var title = idContent.title;
					var author = idContent.author;
					var publisher = idContent.publisher;
					var type = idContent.type;
					
					var htmlToAppend = $('<br><br><h3>Edytuj:</h3><form>\n' + 
							'id:\n' + 
							'<input type=\"text\" id=\"idEdit\"></input><br>\n' + 
							'isbn:\n' + 
							'<input type=\"text\" id=\"isbnEdit\"></input><br>\n' + 
							'title:\n' + 
							'<input type=\"text\" id=\"titleEdit\"></input><br>\n' + 
							'author:\n' + 
							'<input type=\"text\" id=\"authorEdit\"></input><br>\n' + 
							'publisher:\n' + 
							'<input type=\"text\" id=\"publisherEdit\"></input><br>\n' + 
							'type:\n' + 
							'<input type=\"text\" id=\"typeEdit\"></input><br>\n' + 
							'<input type=\"submit\" id=\"submitEdit\" value=\"EDYTUJ\">\n' + 
							'</form>');
					clickedElem.next().append(htmlToAppend);
					
					$('#idEdit').val(id);
					$('#isbnEdit').val(isbn);
					$('#titleEdit').val(title);
					$('#authorEdit').val(author);
					$('#publisherEdit').val(publisher);
					$('#typeEdit').val(type);
					
					$('submitEdit').on('click', function(event) {
						event.preventDefault();
						
						var id = $('#id').val();
						var isbn = $('#isbn').val();
						var title = $('#title').val();
						var author = $('#author').val();
						var publisher = $('#publisher').val();
						var type = $('#type').val();
						
						var object = {
								id: id,
								isbn: isbn,
								title: title,
								author: author,
								publisher: publisher,
								type: type
						};
						
						var stringified = JSON.stringify(object);
						// PUT PART
						$.ajax({
							url : "http://localhost:8080/warsztat5/books/" + $('id'),
							type: "PUT",
							contentType: "application/json",
							data: stringified
							
						}).done(function() {
							console.log('zedytowano książkę');
						});						
					});

					// rozwinięcie DIVa
					clickedElem.next().toggle("slow");				
				});
			});
	}}).always(function() {
		$.each($('#bookList p'), function() {
		var button = $('<button>USUŃ</button>').attr('id', $(this).attr('id'));
		$(this).append(button);
		button.on('click', kasuj);
		});
		
	});
	
	function kasuj() {
		$.ajax({
			url : "http://localhost:8080/warsztat5/books/1",
			type : "DELETE"
		}).done(function(response) {
			console.log(response);
		});
	};

//POST PART

	var button = $('input[id="add"]');
	button.on('click', function(event){
		event.preventDefault();
		
		var id = $('#id').val();
		var isbn = $('#isbn').val();
		var title = $('#title').val();
		var author = $('#author').val();
		var publisher = $('#publisher').val();
		var type = $('#type').val();
		
		var object = {
				id: id,
				isbn: isbn,
				title: title,
				author: author,
				publisher: publisher,
				type: type
		};
		
		var stringified = JSON.stringify(object);
		
		$.ajax({
			url : "http://localhost:8080/warsztat5/books", //add
			type: "POST",
			contentType: "application/json",
			data: stringified
			
		}).done(function() {
			console.log('dodano książkę');
		});
	});	
});