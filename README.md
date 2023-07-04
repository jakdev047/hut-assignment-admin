### Live Link:

## Application Routes:

### USER

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/64a2798bce859347a90889fc
- api/v1/users/64a2798bce859347a90889fa (PATCH)
- api/v1/users/64a2798bce859347a90889fa (DELETE)

### Cows

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/64a278a0ce859347a9080417 (Single GET)
- api/v1/cows/64a278a0ce859347a9080417 (PATCH)
- api/v1/cows/64a278a0ce859347a9080417 (DELETE)

### Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=2
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Dhaka
- api/v1/cows?searchTerm=Brah

### Order

- api/v1/orders (POST)
- api/v1/orders (GET)
