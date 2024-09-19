const { getAllBooks, getBookById } = require("../controllers/index")
const { app } = require("../index")
const http = require("http")
const request = require('supertest')

jest.mock("../controllers", ()=>({
    ...jest.requireActual("../controllers"),
    getAllBooks: jest.fn(),
    getBookById : jest.fn()
}))

let server;
beforeAll((done) => {
    server = http.createServer(app);
    server.listen(3001, done)
})

afterAll((done)=>{
    server.close(done)
})

describe("API testing", () => {
    it("Should return list of all books", async () => {
        let mockBooks = [
            {
                'bookId': 1,
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'genre': 'Fiction'
            },
            {
                'bookId': 2,
                'title': '1984',
                'author': 'George Orwell',
                'genre': 'Dystopian'
            },
            {
                'bookId': 3,
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'genre': 'Classic'
            }
        ]

        getAllBooks.mockReturnValue(mockBooks)
        let result = await request(server).get("/books");
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(mockBooks)
    })

    it("Should return book of by id", async () => {
        let mockBook = {
                'bookId': 1,
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'genre': 'Fiction'
            }

        getBookById.mockReturnValue(mockBook)
        let result = await request(server).get("/books/details/1");
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual(mockBook)
    })
})

describe("Endpoint test", ()=>{
    it('should return all books using endpoint', () => {
        let mockBooks = [
            {
                'bookId': 1,
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'genre': 'Fiction'
            },
            {
                'bookId': 2,
                'title': '1984',
                'author': 'George Orwell',
                'genre': 'Dystopian'
            },
            {
                'bookId': 3,
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'genre': 'Classic'
            }
        ]
        getAllBooks.mockReturnValue(mockBooks);
        let result = getAllBooks();
        expect(result).toEqual(mockBooks); 
        expect(getAllBooks).toHaveBeenCalled();
    })
})