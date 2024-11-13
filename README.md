# AI-Powered Data Extraction Tool

This project is an AI-powered data extraction tool designed to retrieve specific information from the web based on user-defined search queries. It leverages a large language model (LLM) to process and extract data from web search results, returning structured information for each entity. Users can interact with the tool through a simple dashboard, allowing them to upload files, define queries, and download results.

## Features

- **Upload CSV or Google Sheets**: Users can upload a dataset containing entities to search.
- **Web Search Automation**: Automatically performs web searches based on user-defined queries for each entity in the dataset.
- **LLM-Driven Information Extraction**: The tool leverages an LLM (e.g., OpenAI GPT-4) to parse and extract specific information from web results.
- **User-Friendly Dashboard**: View extracted data in a table format and download it as CSV or update Google Sheets directly.
- **Error Handling**: Robust mechanisms for managing failed API calls or unsuccessful LLM queries.


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your system.
- Python (if using FastAPI or similar backend in Python).
- Access to OpenAI API or any other LLM API.
- (Optional) Bing Search API or Google Custom Search API for web search.
- Google Sheets API (for integrating with Google Sheets).

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/ai-powered-data-extraction-tool.git
    cd ai-powered-data-extraction-tool
    ```

2. **Install dependencies**:
    ```bash
    npm install      # for frontend and backend dependencies
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Define the following variables in `.env`:

    ```plaintext
    LLM_API_KEY=your_openai_api_key
    SEARCH_API_KEY=your_search_api_key
    GOOGLE_SHEETS_CREDENTIALS=your_google_credentials_file.json
    ```

4. **Run the Application**:
    - **Backend**:
      ```bash
      npm run server
      ```
    - **Frontend**:
      ```bash
      npm start
      ```

5. **Access the Dashboard**:
    - Open `http://localhost:3000` in your browser to access the dashboard.

---

## Usage

1. **Upload a Dataset**:
   - Go to the dashboard and upload a CSV or connect to Google Sheets.
   - Select the column containing entities (e.g., company names) for the search.

2. **Define Search Queries**:
   - Enter a search prompt, such as “Extract the email address of {entity} from the following web results.”
   - Initiate the search to retrieve information for each entity.

3. **View and Download Results**:
   - View extracted data in a table format within the dashboard.
   - Download results as a CSV or update them directly in Google Sheets.

---

## Project Structure

- **frontend/**: Contains all frontend files and components, built with React and TypeScript.
- **backend/**: Manages API routes, web search automation, and LLM integration.
- **database/**: Stores intermediate and final data for each entity.
- **scripts/**: Scripts for automating tasks (e.g., web search and data extraction).
- **.env**: Stores environment variables.

---

## Technical Details

1. **Web Search Automation**:
   - Uses Bing Search API or Google Custom Search API to perform searches based on user queries.
   - Retrieves relevant snippets and metadata, stored in JSON format for further processing.

2. **LLM Integration**:
   - Passes each entity’s search results to the LLM with a custom prompt.
   - Parses the LLM output to extract specified information (e.g., email addresses, addresses).
   - Manages error handling for failed queries and notifies users of incomplete data.

3. **Data Display and Download**:
   - Displays data in a table format, allowing users to download as CSV or update Google Sheets.

4. **Advanced Error Handling**:
   - Implements retries for failed API calls.
   - Provides notifications in the UI for unprocessed data due to failed queries.

---

## Optional Advanced Features

The following features are implemented for enhanced functionality:

- **Advanced Query Templates**: Supports prompts to extract multiple fields (e.g., “Get the email and address for {entity}”).
- **Google Sheets Integration**: Writes extracted data back to Google Sheets.
- **Robust Error Handling**: Notifies users of API call failures and LLM extraction issues.

---

## Technologies Used

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Node.js (Express or FastAPI)
- **Database**: MongoDB or SQLite (for intermediate data storage)
- **LLM API**: OpenAI GPT-4 or similar
- **Web Search API**: Bing Search API, Google Custom Search API
- **Deployment**: Docker, Heroku/AWS/Azure (for deployment)

---

## Future Enhancements

Consider the following potential improvements:

- **Additional Data Formats**: Support for more file types (e.g., JSON).
- **Multi-Field Extraction**: More robust multi-field extraction using advanced prompt templates.
- **Role-Based Access**: Implement different user roles with varied access levels.

---

## Contributing

1. Fork the repository.
2. Create a new branch with a descriptive name:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Acknowledgements

- OpenAI for the LLM API
- Google for Google Sheets API
- Microsoft for Bing Search API

---

This README file provides a complete guide to the setup, usage, and structure of the project. By following these steps, users and contributors should have an easy time understanding and working with the AI-powered data extraction tool.
