# HANDSON 10 – Framework & State Management Comparison

## State Management Comparison

| Feature | Redux Toolkit | NgRx | Pinia |
|---|---|---|---|
| Framework | React | Angular | Vue |
| State Store | Redux Store | NgRx Store | Pinia Store |
| Async Operations | createAsyncThunk | Effects | Actions |
| Selectors | createSelector | Selectors | Getters |
| Boilerplate | Moderate | High | Low |
| TypeScript Support | Excellent | Excellent | Excellent |
| Learning Curve | Moderate | Higher | Easy |
| API Integration | Middleware/Thunk | Effects | Store Actions |

## Implementation in HANDSON_10

This project uses Vue with Pinia.

The application follows a centralized architecture:

Vue Component
↓
Pinia Store
↓
Axios API Service
↓
REST API
↓
Pinia State
↓
Vue UI

## Axios API Service

A centralized Axios instance is used so API configuration and
error handling are maintained in one location.

The service provides:

- Centralized base URL
- Request timeout
- Common headers
- Global response error handling

## Pinia State Management

The Pinia store manages:

- Student list
- Selected student
- Loading state
- Error state

The store also provides:

- Student count getter
- Selected student getter
- Fetch students action
- Select student action
- Add student action

## Error Handling

Axios response interceptors provide centralized handling for:

- API/server errors
- Network errors
- Request errors

The Pinia store provides a user-friendly error message to the UI.

## Conclusion

HANDSON_10 demonstrates centralized API integration and advanced
state management using Vue, Pinia and Axios. Separating API
communication from application state makes the application easier
to maintain and extend.