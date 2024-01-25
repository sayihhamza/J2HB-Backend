# J2HB-Backend

## Overview

This Nest.js application is designed to read data from a list of files depending on the type and number Ex :"adults/series-2.xlsx", map it into a structured format, and expose it through user-friendly APIs. It simplifies the process of managing series-related data and provides a seamless experience for interacting with the information stored in the Excel file.

## Installation

To run this project locally, follow these steps : ( the application will be accessible at http://localhost:3030 )

1. **Clone Repository:**
   ```bash
   git clone https://github.com/sayihhamza/j2hb-backend
   cd j2hb-backend
   npm install
   npm run start:dev
   ```

## Usage

### Endpoints

1. **Get Available Series Types**
    - **Endpoint:** `http://localhost:3030/series/types`
    - **Description:** GET request to get the available types of series.

2. **Get Number of Series for a Type**
    - **Endpoint:** `http://localhost:3030/series/:type/count`
    - **Description:** GET request to get the number of series for a specific type.
    - **Parameters:**
        - `type` (Path Parameter): The type of series.

3. **Get Series by Type and Number**
    - **Endpoint:** `http://localhost:3030/series/:type/:number`
    - **Description:** GET request to get series quiz for a specific type and number of serie quiz.
    - **Parameters:**
        - `type` (Path Parameter): The type of series.
        - `number` (Path Parameter): The number of the quiz.

### Example 

  **Input :**
        - Represents the content of the "adults/series-2.xlsx" file.

| Question 1                                                     | Reponse 1 | Reponse 2 | Reponse 3 | Reponse 4 | Question 2                                                     | Reponse 2.1 | Reponse 2.2 | Correction |
|----------------------------------------------------------------|-----------|-----------|-----------|-----------|----------------------------------------------------------------|------------|------------|------------|
| هَادْ الطَّرِيقْ يَمْكَنْ لِي الْقِيَّامْ بْالتَّجَاوُزْ:     | نَعَمْ     | لاَ       |           |           | نَتْجَاوَزْ:                                                 | نَعَمْ      | لاَ        | 1,4        |
| الْمَخَالَفَاتْ مَنْ الدَّرَجَة الثَّانِيَة كَتْسْتَوْجَبْ أدَاءْ غَرَامَة مَالِيَة دْيَالْ: | 700 دَرْهَمْ | 500 دَرْهَمْ | 300 دَرْهَمْ |           |                                                             |            |            | 2          |

  **Output :**
        -  Illustrates the transformed JSON object returned by the API.
```json
[
    {
        "questions": [
            {
                "question": "هَادْ الطَّرِيقْ يَمْكَنْ لِي الْقِيَّامْ بْالتَّجَاوُزْ:",
                "responses": [
                    "نَعَمْ",
                    "لاَ"
                ],
                "correction": [
                    0
                ]
            },
            {
                "question": "نَتْجَاوَزْ:",
                "responses": [
                    "نَعَمْ",
                    "لاَ"
                ],
                "correction": [
                    1
                ]
            }
        ]
    },
    {
        "questions": [
            {
                "question": "الْمَخَالَفَاتْ مَنْ الدَّرَجَة الثَّانِيَة كَتْسْتَوْجَبْ أدَاءْ غَرَامَة مَالِيَة دْيَالْ:",
                "responses": [
                    " 700 دَرْهَمْ ",
                    "500 دَرْهَمْ",
                    "300 دَرْهَمْ"
                ],
                "correction": [
                    1
                ]
            }
        ]
    }
]