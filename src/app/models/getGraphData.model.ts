export interface GetGraphDataModel {
    totalBooks: number,
    totalAuthors: number,
    bookLastYear: number,
    categoryDetail: [
        {
            category: string,
            noOfBooks: number
        }
    ]

}