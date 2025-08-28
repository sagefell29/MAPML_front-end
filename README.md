# MAPML Frontend

Machine Learning Analysis Platform Frontend - A modern React-based web application for machine learning model training and evaluation.

## Features

### Core Functionalities
- **Regression Analysis**: Support for multiple regression algorithms with visual results
- **Classification Analysis**: Support for multiple classification algorithms with confusion matrices
- **Data Upload**: Drag-and-drop file upload with format validation
- **Interactive Model Selection**: Visual model selection with descriptions
- **Real-time Validation**: Form validation with helpful error messages
- **Result Visualization**: Beautiful charts and metrics display
- **PDF Export**: Download results as PDF documents

### Frontend Functionalities
1. **File Management**: CSV file upload with validation and parsing
2. **Task Selection**: Switch between regression and classification tasks
3. **Attribute Selection**: Interactive output attribute selection
4. **Preprocessing Options**: Outlier detection and dimensionality reduction
5. **Model Selection**: Visual model selection with descriptions
6. **Result Display**: Comprehensive results with metrics and visualizations
7. **Error Handling**: User-friendly error messages with suggestions

### New Features
- **Enhanced UI/UX**: Modern, responsive design with Chakra UI
- **Toast Notifications**: Real-time feedback for user actions
- **Form Validation**: Comprehensive input validation
- **Loading States**: Visual feedback during processing
- **Error Recovery**: Automatic error clearing and recovery
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **React**: Frontend framework
- **Chakra UI**: Component library for styling
- **Axios**: HTTP client for API communication
- **React Papa Parse**: CSV file parsing
- **HTML2PDF.js**: PDF generation for results

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MAPML_front-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

The application will open in your browser at `http://localhost:3000`

## Usage

### Getting Started

1. **Select Task Type**: Choose between "Regression" or "Classification"
2. **Upload Dataset**: Select a CSV file from your computer
3. **Configure Settings**: 
   - Select output attribute
   - Choose categorical variable handling
   - Configure preprocessing options
   - Select models for analysis
4. **Submit Analysis**: Click "Submit" to start the analysis
5. **View Results**: Review metrics, charts, and confusion matrices
6. **Export Results**: Download results as PDF

### File Requirements

- **Format**: CSV files only
- **Encoding**: UTF-8 recommended
- **Headers**: First row should contain column names
- **Data**: Clean, structured data without missing values

### Supported Models

#### Regression Models
- Linear Regression
- Support Vector Regression (SVR)
- Random Forest Regressor
- Adaptive Boosting Regressor
- Extra Trees Regressor
- Huber Regressor
- Gradient Boosting Regressor

#### Classification Models
- Decision Tree Classifier
- Random Forest Classifier
- Support Vector Classifier
- K-Neighbors Classifier
- Naive Bayes Classifier

### Preprocessing Options

#### Outlier Detection
- **Local Outlier Factor (LOF)**: Density-based outlier detection
- **Isolation Forest (IF)**: Tree-based outlier detection

#### Dimensionality Reduction
- **Principal Component Analysis (PCA)**: Linear dimensionality reduction
- **Recursive Feature Elimination (RFE)**: Feature selection method

#### Categorical Variable Handling
- **No operation**: Keep categorical variables as-is
- **Remove**: Remove all categorical variables
- **Label Encoding**: Convert categories to numeric labels
- **One-Hot Encoding**: Create binary columns for each category

## Project Structure

```
MAPML_front-end/
├── public/                          # Static files
│   ├── index.html                   # Main HTML file
│   └── manifest.json                # Web app manifest
├── src/                             # Source code
│   ├── app.js                       # Main application component
│   ├── index.js                     # Application entry point
│   ├── components/                  # React components
│   │   ├── AttributeSelection.js    # File parsing and attribute selection
│   │   ├── ErrorHandler.js          # Error display component
│   │   ├── classification/          # Classification components
│   │   │   ├── ConfusionMatrix.js   # Confusion matrix display
│   │   │   ├── ModelSelectionC.js   # Classification model selection
│   │   │   └── ResultsC.js          # Classification results display
│   │   └── regression/              # Regression components
│   │       ├── ChartComponent.js    # Regression charts
│   │       ├── ModelSelectionR.js   # Regression model selection
│   │       └── ResultsR.js          # Regression results display
│   └── extras/                      # Additional utilities
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## Component Documentation

### Main Components

#### App.js
Main application component that handles:
- State management
- Form submission
- API communication
- Error handling
- Task switching

#### AttributeSelection.js
Handles file parsing and attribute selection:
- CSV file parsing
- Attribute extraction
- Loading states
- Error handling

#### ErrorHandler.js
Displays user-friendly error messages:
- Error styling
- Helpful suggestions
- Consistent error format

### Model Selection Components

#### ModelSelectionR.js
Regression model selection with:
- Visual model cards
- Model descriptions
- Selection counters
- Bulk selection options

#### ModelSelectionC.js
Classification model selection with:
- Visual model cards
- Model descriptions
- Selection counters
- Bulk selection options

### Results Components

#### ResultsR.js
Regression results display:
- Performance metrics
- Scatter plots
- Download options
- PDF export

#### ResultsC.js
Classification results display:
- Performance metrics
- Confusion matrices
- Download options
- PDF export

#### ConfusionMatrix.js
Confusion matrix visualization:
- Color-coded cells
- Class labels
- Legend
- High contrast design

## API Integration

The frontend communicates with the backend API at `http://127.0.0.1:8000/api`:

### Endpoints
- `POST /api/predict`: Submit analysis request
- `GET /api/health`: Check API status

### Request Format
```javascript
const formData = new FormData();
formData.append("dataset", file);
formData.append("output_Attribute", outputAttribute);
formData.append("task", selectedTask);
formData.append("model_Type", selectedModels);
// ... other parameters
```

### Response Format
```javascript
{
  status: "success",
  result: [
    {
      model: "model_name",
      acs: 0.95,
      ps: 0.94,
      rs: 0.95,
      f1s: 0.94,
      pred: [...],
      y_test: [...],
      confusion_matrix: [[...]],
      classes: [...]
    }
  ]
}
```

## Error Handling

The frontend implements comprehensive error handling:

### Error Types
- **File Upload Errors**: Invalid file format, parsing errors
- **Validation Errors**: Missing required fields, invalid inputs
- **Network Errors**: Connection issues, timeout errors
- **API Errors**: Backend processing errors

### Error Display
- Toast notifications for immediate feedback
- Detailed error messages with suggestions
- Automatic error clearing on new actions
- Graceful error recovery

## Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Chakra UI components for consistency
- Implement proper error boundaries
- Add JSDoc comments for complex functions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
