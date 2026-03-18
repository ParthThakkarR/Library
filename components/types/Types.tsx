// types.ts
export interface ItemTransaction {
  id: string;
  itemId: string;
  isAvailable: boolean;
  itemAssignedTo?: string;
  issueDate: string;
  items?: Item;
  patron?: Patron;
}

export interface Item {
  id: string;
  itemTitle: string;
  itemAuthor: string;
  itemType: string;
  itemPrice: number;
  item_transaction?: ItemTransaction[];
}

// export interface Patron {
//   id: string;
//   patronFirstName: string;
//   patronMiddleName?: string;
//   patronLastName: string;
//   patronDepartment: string;
//   patronSemester: number;
//   patronRollNo: number;
//   patronEnrollmentNumber: number;
//   userId: string;
//   users: {
//     userName: string;
//     userEmail: string;
//     user_type: {
//       userTypeName: string;
//     };
//   };
//   patronImage?: string;
// }

export interface Patron {
  id: string;
  patronFirstName: string;
  patronMiddleName?: string;
  patronLastName: string;
  patronDepartment: string;
  patronSemester: number;
  patronRollNo: number;
  patronEnrollmentNumber: number;
  userId: string;
  patronImage?: string;
  activeBorrow?: number,
  users: {
    userName: string;
    userEmail: string;
    user_type: {
      userTypeName: string;
      isAdmin: boolean;
      isLibrarian: boolean;
      isStudent: boolean;
    };
  };

  // ✅ Add transactions here
  item_transaction?: {
    id: string;
    itemId: string;
    isAvailable: boolean;
    itemAssignedTo?: string;
    isVisible: boolean;
    issueDate: string;   // Prisma DateTime → string in JSON
    dueDate?: string;

    items?: {
      id: string;
      itemTitle: string;
      itemAuthor: string;
      itemType: string;
      isbn: string;
      itemPrice: number;
      quantity: number;
    };
  }[];
}


export interface DashboardData {
  totalBooks: number;
  activeMembers: number;
  booksIssued: number;
  overdue: number;
  monthlyData: { month: string; issues: number }[];
  recentActivity: {
    type: "issue" | "return";
    message: string;
    time: string;
  }[];
}
