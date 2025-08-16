import type { SortOrderType } from "~/types/globals.type"

type SortQueryType = {
orderBy: "newest" | "createdAt" | "likes"
sortDirection:  "asc" | "desc"
}

export const getSortQuery = (sortOrder: SortOrderType): SortQueryType => {
  let orderBy: SortQueryType["orderBy"] 
  let sortDirection: SortQueryType["sortDirection"]
  switch(sortOrder) {
    case "newest":
      orderBy = "createdAt"
      sortDirection = "desc"
      break
    case "oldest":
      orderBy = "createdAt"
      sortDirection = "asc"
      break
    default:
      orderBy = "likes"
      sortDirection = "desc"
  }
  
  return { orderBy, sortDirection }
} 