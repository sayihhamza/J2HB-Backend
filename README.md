# J2HB-Backend

## Overview

This Nest.js application is designed to read data from the "series.xlsx" file, map it into a structured format, and expose it through user-friendly APIs. It simplifies the process of managing series-related data and provides a seamless experience for interacting with the information stored in the Excel file.

## Installation

To run this project locally, follow these steps:

1. **Clone Repository:**
   ```bash
   git clone https://github.com/sayihhamza/j2hb-backend
   cd j2hb-backend
   npm install
   npm run start:dev
   ```
  The application will be accessible at http://localhost:3030/series

## Usage

  **Input : ( for given series.xlsx file )**
| Question 1                                                     | Reponse 1 | Reponse 2 | Reponse 3 | Reponse 4 | Question 2                                                     | Reponse 2.1 | Reponse 2.2 | Correction |
|----------------------------------------------------------------|-----------|-----------|-----------|-----------|----------------------------------------------------------------|------------|------------|------------|
| هَادْ الطَّرِيقْ يَمْكَنْ لِي الْقِيَّامْ بْالتَّجَاوُزْ:     | نَعَمْ     | لاَ       |           |           | نَتْجَاوَزْ:                                                 | نَعَمْ      | لاَ        | 1,4        |
| الْمَخَالَفَاتْ مَنْ الدَّرَجَة الثَّانِيَة كَتْسْتَوْجَبْ أدَاءْ غَرَامَة مَالِيَة دْيَالْ: | 700 دَرْهَمْ | 500 دَرْهَمْ | 300 دَرْهَمْ |           |                                                             |            |            | 2          |

  **Output : ( nicely formated json object)**

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
    },
    // ... (rest of the JSON data)
]
