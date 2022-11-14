
export interface TableBookDataModel {

    bookReferenceNo: string,
    title: string,
    numberOfVolume: number,
    authors: [
        {
            authorId: number,
            authorName: string,
            experience: number,
            bookId: number
        }
    ],
    category: {
        categoryId: number,
        categoryName: string
    },
    numberOfPages: number,
    subCategory: {
        subCategoryId: number,
        subCategoryName: string,
        categoryId: number
    }

}
