# JSON Placeholder API Tests

This project contains automated tests for the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API using TypeScript and PLaywright.

## Features

- Written in TypeScript for type safety and maintainability
- Covers key endpoints: posts, comments
- Easy to extend with new test cases

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/)
- [Typescript](https://www.typescriptlang.org/)

### Installation

```bash
git clone https://github.com/Pjoter94/json_placeholder_api_tests.git
cd json_placeholder_api_tests
npm install
```

### Running Tests

```bash
npm test
```
To run specific test spec:
```bash
npm test:posts
```
Or:
```bash
npm test:comments
```

## Project Structure

```
.

├── src/
│   ├── api/           # API request helpers and clients
│   ├── utils/         # Utility functions
│   └── types/         # TypeScript type definitions
├── tests/          # Test cases
├── package.json
├── tsconfig.json
└── README.md
```
