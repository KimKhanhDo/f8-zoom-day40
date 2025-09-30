# Day 40: Bài tập về nhà

## Redux Core & React-Redux Integration

### Yêu cầu chung

-   Tạo repo **`f8-zoom-day40`** sử dụng **Vite** (template **React – JavaScript + SWC**).
-   Deploy bài tập trên **GitHub Pages** (sử dụng `gh-pages`).
-   Giao diện **đơn giản, sạch sẽ** (tự viết CSS/SCSS).
-   **Mục tiêu chính:** Hiểu sâu về **Redux Core** và **tự implement React-Redux**.

---

## Bài 1: Tự implement Redux Core từ đầu

### 1.1. Tạo Redux Core tại `public/redux.js`

**Yêu cầu implement**:

Export function `createStore(reducer, preloadedState)` với các methods:

-   `getState()`: Trả về state hiện tại.
-   `dispatch(action)`: Cập nhật state thông qua reducer.
-   `subscribe(listener)`: Đăng ký listener, trả về function `unsubscribe`.

> File này phải là **pure JavaScript** (không phụ thuộc vào React hay framework nào).

### 1.2. Tạo file `public/redux.html`

File HTML chạy độc lập để demo Redux Core vừa tạo. Import `redux.js` bằng `<script>` và demo **counter app**.

**Yêu cầu giao diện:**

-   Hiển thị **số counter** hiện tại.
-   Button **Increase** (tăng 1).
-   Button **Decrease** (giảm 1).
-   Button **Reset** (về 0).
-   Button **Remove Listener** (sau khi click, các button khác không còn cập nhật UI nữa).

**Expected behavior:**

-   Click **Increase** → Counter tăng 1.
-   Click **Decrease** → Counter giảm.
-   Click **Reset** → Counter về 0.
-   Click **Remove Listener** → Sau đó click các button khác, **state vẫn thay đổi** (xem `console.log`) **nhưng UI không update**.

> **Lưu ý:** Hiểu rõ vì sao UI **không update sau khi `unsubscribe`** – đây là cốt lõi của **subscription pattern**. Luôn `console.log` state mỗi lần `dispatch` để kiểm tra.

---

## Bài 2: Task Management với **tự implement React-Redux**

### 2.1. Copy Redux Core & tạo React-Redux

**Bước 1:** Copy file `redux.js` từ `public/redux.js` sang `src/libs/redux.js`

**Bước 2:** Tạo `src/libs/react-redux.js` và implement các exports sau:

**Provider Component**

-   Nhận prop `store` và `children`.
-   Dùng **React Context** để _provide_ store xuống component tree.

**useStore Hook**

-   Trả về **store instance** từ Context.

**useSelector Hook**

-   Nhận **selector function** làm tham số.
-   **Subscribe** vào store và **re-render** component khi **selected value** thay đổi.
-   **Tối ưu** để chỉ re-render khi value thực sự thay đổi.

**useDispatch Hook**

-   Trả về **dispatch** từ store.

> **Lưu ý quan trọng**
>
> -   Không dùng `redux` và `react-redux` từ npm – **phải tự implement**.
> -   Xử lý edge cases: **component unmount** cần **unsubscribe** listener trong `useSelector`.

### 2.2. Setup JSON Server

-   Cài đặt **`json-server`** và tạo file **`db.json`** ở thư mục gốc với cấu trúc phù hợp (mỗi task có `id`, `title`, …).
-   Thêm script `mock-api` vào `package.json` để chạy `json-server` trỏ tới `db.json`.
-   Chạy:
    ```bash
    npm run mock-api
    ```

### 2.3. Cấu trúc thư mục

```
db.json                       # Database cho json-server

public/
├─ redux.js                   # Redux core implementation
└─ redux.html                 # Demo Redux core với vanilla JS

src/
├─ libs/
│  ├─ redux.js                # Copy từ public/redux.js
│  └─ react-redux.js          # React-Redux implementation
├─ store/
│  ├─ index.js                # Config store với Redux tự implement
│  └─ reducers/
│     └─ taskReducer.js
├─ pages/
│  ├─ TaskList/
│  │  ├─ index.jsx
│  │  └─ TaskList.module.scss
│  ├─ NewTask/
│  │  ├─ index.jsx
│  │  └─ NewTask.module.scss
│  └─ EditTask/
│     ├─ index.jsx
│     └─ EditTask.module.scss
├─ components/
│  ├─ TaskItem/
│  │  ├─ index.jsx
│  │  └─ TaskItem.module.scss
│  └─ TaskForm/
│     ├─ index.jsx
│     └─ TaskForm.module.scss
└─ App.jsx
```

### 2.4. Redux Actions & Reducer

**Actions cần implement:**

-   `SET_TASKS`: Set danh sách tasks từ API vào store.
-   `ADD_TASK`: Thêm task mới vào store (sau khi API success).
-   `UPDATE_TASK`: Cập nhật một task trong store (sau khi API success).
-   `DELETE_TASK`: Xóa một task khỏi store (sau khi API success).

**Reducer requirements:**

-   Initial state gồm: `tasks` (array), `loading` (boolean), `error` (null hoặc string).
-   Mỗi action **trả về state mới**, **không mutate** state cũ.
-   Handle đầy đủ các action types với logic phù hợp.

### 2.5. Pages Requirements

**TaskList Page (`/`)**

-   Dùng `useSelector` từ `src/libs/react-redux.js` để lấy `tasks`.
-   Dùng `useDispatch` để `dispatch` actions.
-   `useEffect` để fetch tasks khi mount và `dispatch` `SET_TASKS`.
-   Hiển thị danh sách tasks với mỗi item có:
    -   Title của task
    -   Button **Edit** → Navigate tới `/:id/edit`
    -   Button **Delete** → Gọi API `DELETE`, sau đó `dispatch` `DELETE_TASK`
    -   Button **Create New Task** → Navigate tới `/new-task`
-   Hiển thị **loading state** khi đang fetch.
-   Hiển thị message **“Chưa có task nào”** nếu list rỗng.
-   `console.log` mỗi khi component re-render để debug.

**NewTask Page (`/new-task`)**

-   Form có **input** cho `title`.
-   Khi submit:
    -   Validate `title` **không rỗng** (sau khi `trim`).
    -   Gọi API **POST** để tạo task mới.
    -   `dispatch` **`ADD_TASK`** với data response.
    -   `navigate` về `/` bằng `useNavigate`.
-   Nút **Cancel** để quay về trang list.
-   **Disable form** khi đang submit.
-   Hiển thị **error** nếu API fail.

**EditTask Page (`/:id/edit`)**

-   Dùng `useParams` để lấy `id`.
-   **Pre-fill** form với data hiện tại.
-   Nếu task **không tồn tại** (sai id/404), **redirect** về `/`.
-   Khi submit:
    -   Validate `title` không rỗng.
    -   Gọi API **PUT/PATCH** để update.
    -   `dispatch` **`UPDATE_TASK`** với data mới.
    -   `navigate` về `/`.
-   Nút **Cancel** để quay về trang list.
-   **Disable form** khi đang submit.

### 2.6. Component Requirements

**TaskForm Component**

-   Reusable form component dùng chung cho **Create** và **Edit**.
-   Props: `initialData`, `onSubmit`, `submitText` (“Create” | “Update”), `isLoading`.
-   Validation: `title` không được trống sau khi đã `trim`.
-   Hiển thị **error message** nếu validation fail.
-   **Auto focus** vào input khi component mount.

**TaskItem Component**

-   Props: `task`, `onEdit`, `onDelete`, `isDeleting`.
-   **Confirm** trước khi xóa: “Bạn có chắc muốn xóa task này?”
-   **Disable** các button khi đang xóa.
-   Có **visual feedback** khi hover các buttons.

---

> **Tip học nhanh:** Bắt đầu với **Redux core** trong **JS thuần** để hiểu rõ cơ chế. Test kỹ trong `redux.html` trước khi copy sang React. Debug bằng cách **log mọi thứ** – `dispatch`, thay đổi `state`, và `renders`.
