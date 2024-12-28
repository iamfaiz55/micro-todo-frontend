import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// export interface ITodo {
//     task: string,
//     desc: string,
//     priority: string,
//     isComplete: boolean,
//     _id?: string
// }

export const todoApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
         baseUrl: "https://micro-todo-backend.vercel.app/api", 
         
         credentials:"include",

         prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.user?.token;
            console.log("from api", token);
            
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["todo"],
    endpoints: (builder) => {
        return {
            getTodos: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),
            addTodo: builder.mutation({
                query: todoData => {
                    return {
                        url: "/",
                        method: "POST",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            updateTodo: builder.mutation({
                query: todoData => {
                    return {
                        url: `/${todoData._id}`,
                        method: "PUT",
                        body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),
            deleteTodo: builder.mutation({
                query: id => {
                    return {
                        url: `/${id}`,
                        method: "DELETE",
                        // body: todoData
                    }
                },
                invalidatesTags: ["todo"]
            }),

        }
    }
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = todoApi
