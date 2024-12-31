## AI-QA assistant Powered by GeminiAI
```markdown


## Getting Started

To run the development server locally, use one of the following commands:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

You can start editing the application by modifying `app/page.tsx`. The application will automatically reload and reflect changes in real-time.

## Technologies Used

### Frontend

- **Next.js**: A React-based framework for building high-performance web applications with server-side rendering and static site generation.
- **ShadCN**: For consistent and customizable design components, ensuring a polished and professional UI experience.
- **TypeScript**: Adds type safety and improves code maintainability.

### Backend

- **Python**: For backend logic, ensuring clean and scalable server-side operations.
- **FastAPI**: A modern, fast (high-performance), and easy-to-use web framework for building APIs in Python. FastAPI was chosen for its ability to handle asynchronous operations efficiently and its intuitive interface for defining endpoints, making it a great fit for a scalable and robust backend.

### Database

- **MongoDB**: A NoSQL database for storing and retrieving data. It provides flexibility and scalability, making it suitable for dynamic datasets like user interactions and history.

### AI Service

- **Gemini AI**: Used for the AI assistant to handle user queries and provide intelligent responses. Gemini AI was selected for its state-of-the-art natural language processing capabilities, ensuring accurate and context-aware answers.

## Features

- **Interactive Question-Answer Interface**: A seamless interface to interact with the AI assistant.
- **History Tracking**: Logs of past queries and responses, accessible through the UI.
- **Scalable Backend**: Powered by FastAPI for handling high-performance API requests.
- **Customizable UI**: Designed with ShadCN for a clean and consistent user interface.

## Folder Structure

Here’s an overview of the application’s folder structure:

```
ai-qa/
├── app/                 # Application core files
│   ├── api/             # API routes for handling server-side logic
│   │   ├── ask/         # Endpoint for AI assistant queries
│   │   ├── history/     # Endpoint for managing interaction history
│   │   └── route.ts     # Main API routing logic
│   ├── layout.tsx       # Application layout component
│   ├── page.tsx         # Main application page
├── backend/             # Backend logic and API
│   ├── main.py          # FastAPI server implementation
│   └── requirements.txt # Python dependencies
├── components/          # Reusable UI components
│   ├── ui/              # Specific UI elements
│   │   ├── button.tsx   # Button component
│   │   ├── card.tsx     # Card component
│   │   ├── textarea.tsx # Textarea component
│   │   ├── qa-form.tsx  # Form for question submission
│   │   ├── qa-history.tsx # Component for interaction history
│   │   └── qa-interface.tsx # Main QA interface
├── lib/                 # Utility functions and configurations
│   ├── mongodb.ts       # MongoDB database connection logic
│   └── utils.ts         # General utilities
├── styles/              # Global styles
│   └── globals.css      # Global CSS rules
├── public/              # Static assets (e.g., images, fonts)
├── .env.local           # Environment variables for development
├── README.md            # Project documentation
```

## Why FastAPI?

FastAPI was chosen for its speed, ease of use, and asynchronous capabilities, allowing for rapid development and high-performance API handling. Its compatibility with Python and ability to auto-generate interactive API documentation (Swagger UI) make it a great tool for building scalable applications.

## Why ShadCN?

ShadCN was utilized for its ability to create customizable and reusable design components. It simplifies styling while ensuring a cohesive user interface across the application.

## Future Enhancements

- Add authentication for personalized experiences.
- Integrate analytics to track user behavior and improve the assistant’s accuracy.
- Support additional AI services for broader functionality.

Feel free to contribute or raise issues for any feature requests or bugs!
```
